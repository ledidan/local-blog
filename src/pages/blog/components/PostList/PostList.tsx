import { deletePost, getPostList, startEditPost } from 'pages/blog/Blog.slice'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import { useEffect } from 'react'
import SkeletonPost from '../PostSkeleton'
import { useGetPostsQuery } from 'pages/blog/Blog.service'
import PostItems from '../PostItem'
// fetch & catch API in useEffect()
// If successfully fetch, dispatching action type: "blog/getPostListSuccess"
// If failure, dispatching postListFailed : "blog/getPostFailed"

const PostList = () => {
  // CreateAsyncThunk Method

  // const postList = useSelector((state: RootState) => state.blog.postList)
  // const loading = useSelector((state: RootState) => state.blog.loading)
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   const promise = dispatch(getPostList())
  //   return () => {
  //     promise.abort()
  //   }
  // }, [dispatch])
  // const handleDelete = (postId: string) => {
  //   dispatch(deletePost(postId))
  // }
  // const handleStartEdit = (postId: string) => {
  //   dispatch(startEditPost(postId))
  // }

  // isLoading for first time fetch
  // isFetching for every single time fetch API
  const { data, isLoading, isFetching } = useGetPostsQuery()

  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Blackdouble.D</h2>
          <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>
            Đừng bao giờ từ bỏ. Hôm nay khó khăn, ngày mai sẽ trở nên tồi tệ. Nhưng ngày mốt sẽ có nắng
          </p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
          {/* {loading && <SkeletonPost />}
          {!loading &&
            postList.map((post) => (
              <PostItems post={post} key={post.id} handleDelete={handleDelete} handleStartEdit={handleStartEdit} />
            ))} */}
          {isFetching && (
            <>
              <SkeletonPost />
              <SkeletonPost />
            </>
          )}
          {!isFetching && data?.map((post) => <PostItems key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  )
}

export default PostList
