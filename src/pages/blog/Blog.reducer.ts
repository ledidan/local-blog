import { createAction, createReducer } from '@reduxjs/toolkit'
import { initialPostList } from 'constants/blog'
import { Post } from 'types/blog.type'

interface BlogState {
  postList: Post[]
  editPost: Post | null
}

const initialState: BlogState = {
  postList: initialPostList,
  editPost: null
}

export const addPost = createAction<Post>('blog/addPost')
export const deletePost = createAction<string>('blog/deletePost')
export const startEditPost = createAction<string>('blog/startEditPost')
export const cancelEditPost = createAction('blog/cancelEditPost')
export const finishEditPost = createAction<Post>('blog/finishEditPost')
const blogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addPost, (state, action) => {
      //immerjs help us mutate a safe state
      const post = action.payload
      state.postList.push(post)
    })
    .addCase(deletePost, (state, action) => {
      const postId = action.payload
      const foundPostIndex = state.postList.findIndex((post) => post.id === postId)
      if (foundPostIndex !== -1) {
        state.postList.splice(foundPostIndex, 1)
      }
    })
    .addCase(startEditPost, (state, action) => {
      const postId = action.payload
      const foundPost = state.postList.find((post) => post.id === postId) || null
      state.editPost = foundPost
    })
    .addCase(cancelEditPost, (state) => {
      state.editPost = null
    })
    .addCase(finishEditPost, (state, action) => {
      const postId = action.payload.id
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload
        }
        return true
      })
    })
})

export default blogReducer
