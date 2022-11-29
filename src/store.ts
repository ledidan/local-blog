import { configureStore } from '@reduxjs/toolkit'
import blogReducer from 'pages/blog/Blog.reducer'

export const store = configureStore({
  reducer: {
    blog: blogReducer
  }
})

// Get RootState and AppDispatch from our store
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
