import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { Post } from 'types/blog.type'
// import http from 'utils/_api'

// type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

// type PendingAction = ReturnType<GenericAsyncThunk['pending']>
// type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
// type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface BlogState {
  // postList: Post[]
  // editPost: Post | null
  // loading: boolean
  // currentRequestId: undefined | string
  postId: string
}

const initialState: BlogState = {
  // postList: [],
  // editPost: null,
  // loading: false,
  // currentRequestId: undefined,
  postId: ''
}

// export const getPostList = createAsyncThunk('blog/getPostList', async (_, thunkAPI) => {
//   const response = await http.get<Post[]>('posts', {
//     signal: thunkAPI.signal
//   })
//   return response.data
// })
// export const addPost = createAsyncThunk('blog/addPostList', async (body: Omit<Post, 'id'>, thunkAPI) => {
//   try {
//     const response = await http.post<Post>('posts', body, {
//       signal: thunkAPI.signal
//     })
//     return response.data
//   } catch (err: any) {
//     if (err.name === 'AxiosError' && err.response.status === 422) {
//       return thunkAPI.rejectWithValue(err.response.data)
//     }
//     throw err
//   }
// })
// export const updatePost = createAsyncThunk(
//   'blog/updatePost',
//   async ({ postId, body }: { postId: string; body: Post }, thunkAPI) => {
//     try {
//       const response = await http.put<Post>(`posts/${postId}`, body, {
//         signal: thunkAPI.signal
//       })
//       return response.data
//     } catch (err: any) {
//       if (err.name === 'AxiosError' && err.response.status === 422) {
//         return thunkAPI.rejectWithValue(err.response.data)
//       }
//       throw err
//     }
//   }
// )

// export const deletePost = createAsyncThunk('blog/deletePost', async (postId: string, thunkAPI) => {
//   const response = await http.delete<Post>(`posts/${postId}`, {
//     signal: thunkAPI.signal
//   })
//   return response.data
// })

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startEditPost: (state, action: PayloadAction<string>) => {
      state.postId = action.payload
    },
    cancelEditPost: (state) => {
      state.postId = ''
    }
  }
  // extraReducers(builder) {
  //   builder
  //     .addCase(getPostList.fulfilled, (state, action) => {
  //       state.postList = action.payload
  //     })
  //     .addCase(addPost.fulfilled, (state, action) => {
  //       state.postList.push(action.payload)
  //     })
  //     .addCase(updatePost.fulfilled, (state, action) => {
  //       state.postList.find((post, index) => {
  //         if (post.id === action.payload.id) {
  //           state.postList[index] = action.payload
  //           return true
  //         }
  //         return false
  //       })
  //       state.editPost = null
  //     })
  //     .addCase(deletePost.fulfilled, (state, action) => {
  //       const postId = action.meta.arg
  //       const deletePostIndex = state.postList.findIndex((post) => post.id === postId)
  //       if (deletePostIndex !== -1) {
  //         state.postList.splice(deletePostIndex, 1)
  //       }
  //     })
  //     .addMatcher<PendingAction>(
  //       (action) => action.type.endsWith('/pending'),
  //       (state, action) => {
  //         state.loading = true
  //         state.currentRequestId = action.meta.requestId
  //       }
  //     )
  //     .addMatcher<RejectedAction | FulfilledAction>(
  //       (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
  //       (state, action) => {
  //         if (state.loading && state.currentRequestId === action.meta.requestId) {
  //           state.loading = false
  //           state.currentRequestId = undefined
  //         }
  //       }
  //     )
  //     .addDefaultCase((state, action) => {
  //       // console.log(`action type: ${action.type}`, current(state))
  //     })
  // }
})

export const { cancelEditPost, startEditPost } = blogSlice.actions
const blogReducer = blogSlice.reducer
export default blogReducer
