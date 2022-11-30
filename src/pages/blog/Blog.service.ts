import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from 'types/blog.type'

export const blogApi = createApi({
  reducerPath: 'blogAPI', // Field name in redux state
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/'
  }),
  endpoints: (build) => ({
    // Generic arrange type response and argument
    getPosts: build.query<Post[], void>({
      query: () => 'posts' //method doesn't have argument
    })
  })
})

export const { useGetPostsQuery } = blogApi
