import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from 'types/blog.type'

export const blogApi = createApi({
  reducerPath: 'blogAPI', // Field name in redux state
  tagTypes: ['Posts'], // Tag type that allow to use in blogAPI
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/'
  }),
  endpoints: (build) => ({
    // Generic arrange type response and argument
    getPosts: build.query<Post[], void>({
      query: () => 'posts', //method doesn't have argument
      /**
       * providesTag could be an array or callback return array
       * If having any single invalidatesTag that match with this providesTag
       * that will help getPosts method re-render and update blog list
       * as tags below
       */
      providesTags(result) {
        /**
         * This callback will run in every time getPosts run
         * Promise that will return a type of array ```ts
         * interface Tags: {
         *  type: "Posts";
         *  id: string;
         * }[]
         * ````
        So that must add as const inside to notice type is Read only, cannot mutate
         */
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
            { type: 'Posts' as const, id: 'LIST' }
          ]
          return final
        }
        const final = [{ type: 'Posts' as const, id: 'LIST' }]
        return final
      }
    }),
    addPosts: build.mutation<Post, Omit<Post, 'id'>>({
      query(body) {
        return {
          url: 'posts',
          method: 'POST',
          body
        }
      },
      /**
       * invalidatesTags provide some tags to notice to provideTags which have method match with its, that will be re-called
       * In this case - getPosts will be re-called
       */
      invalidatesTags: (result, error, body) => [{ type: 'Posts', id: 'LIST' }]
    }),
    getPost: build.query<Post, string>({
      query: (id) => `posts/${id}`
    }),
    updatePost: build.mutation<Post, { id: string; body: Post }>({
      query(data) {
        return {
          url: `posts/${data.id}`,
          method: 'PUT',
          body: data.body
        }
      },
      invalidatesTags: (result, error, data) => [{ type: 'Posts', id: data.id }]
    }),
    deletePost: build.mutation<{}, string>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id }]
    })
  })
})

export const { useGetPostsQuery, useAddPostsMutation, useGetPostQuery, useUpdatePostMutation, useDeletePostMutation } =
  blogApi
