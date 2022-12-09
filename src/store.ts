import { rtkQueryErrorLogger } from './middleware'
import { blogApi } from './pages/blog/Blog.service'
import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import blogReducer from 'pages/blog/Blog.slice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    [blogApi.reducerPath]: blogApi.reducer // Add reducer created by api slice
  },
  // add api middleware to enable some function catching, invalidation, polling and rtk-query

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(blogApi.middleware, rtkQueryErrorLogger)
  }
})
// Optional, required refetchOnFocus/refetchOnReconnect

setupListeners(store.dispatch)

// Get RootState and AppDispatch from our store
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
