import { isEntityError } from 'utils/helpers'
import { AnyAction, isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
const isPayLoadErrorMessage = (payload: unknown): payload is { data: { error: string }; status: number } => {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'data' in payload &&
    typeof (payload as any).data?.error === 'string'
  )
}

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action: AnyAction) => {
  /**
   * `isRejectedWithValue` là một function giúp chúng ta kiểm tra những action có rejectWithValue = true từ createAsyncThunk
   * RTK Query sử dụng `createAsyncThunk` bên trong nên chúng ta có thể dùng `isRejectedWithValue` để kiểm tra lỗi
   */

  if (isRejectedWithValue(action)) {
    // Mỗi khi thực hiện query hoặc mutation mà bị lỗi thì nó sẽ chạy vào đây
    // Những lỗi từ server thì action nó mới có rejectedWithValue = true
    // Còn những action liên quan đến việc caching mà bị rejected thì rejectedWithValue = false, nên đừng lo lắng, nó không lọt vào đây được
    if (isPayLoadErrorMessage(action.payload)) {
      // Lỗi reject từ server chỉ có message thôi !!
      toast.warn(action.payload.data.error)
    } else if (!isEntityError(action.payload)) {
      // Lỗi còn lại trường lỗi 422: Có thể là từ SerializeError
      toast.warn(action.error.message)
    }
  }
  return next(action)
}
