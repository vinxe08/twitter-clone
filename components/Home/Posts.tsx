import React from 'react'
import useFetchPost from '../../hooks/useFetchAllPost'
import { IPosts } from '../../interfaces/Posts'
import PostCard from './PostCard'

interface IProps {
  posts:IPosts[]
}

const Posts: React.FC<IProps> = ({posts}) => {
  const { realTimePost, useSSRPosts } = useFetchPost()

  return (
    <>
      {useSSRPosts 
        // if app refresh -> this will work
        ? posts.map(tweet => <PostCard key={tweet._id} posts={tweet}/> )

        // if you add post through PostField -> this will work
        :  realTimePost.map(tweet => <PostCard key={tweet._id} posts={tweet}/> ) 
      }
    </>
  )
}

export default Posts


