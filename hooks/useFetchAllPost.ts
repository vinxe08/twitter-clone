import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { handlePostState, useSSRPostsState } from "../atoms/postAtom";
import { IPosts } from "../interfaces/Posts";

const useFetchAllPost = () => {
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

  return { realTimePost, useSSRPosts }

}

export default useFetchAllPost