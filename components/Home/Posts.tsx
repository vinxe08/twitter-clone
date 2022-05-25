import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { postModalState } from '../../atoms/modalAtom'
import { handlePostState, useSSRPostsState } from '../../atoms/postAtom'
import { IPosts } from '../../interfaces/Posts'
import PostCard from './PostCard'

interface IProps {
  posts:IPosts[]
}

const Posts: React.FC<IProps> = ({posts}) => {
  const [postModal, setPostModal] = useRecoilState(postModalState)
  const [realTimePost, setRealTimePost] = useState<IPosts[]>([])
  const [handlePost, setHandlePost] = useRecoilState(handlePostState)
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);

  useEffect(() => {
    let mounted = true;
    const fetchPosts = async () => {
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: { "Content-Type":"application/json" }
      });

      const responseData = await response.json();
      if(mounted) {
        setRealTimePost(responseData);
        setHandlePost(false)
        setUseSSRPosts(false)
      }
    }

    fetchPosts()
    return () => {
      mounted = false;
    }
  }, [handlePost])

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


