import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { handleCommentState, useSSRCommentsState } from "../atoms/commentAtom"
import { IPosts } from "../interfaces/Posts"


const useFetchComment = (id: any) => {
  const [realTimeComment, setRealTimeComment] = useState<IPosts[]>([])
  const [handleComment, setHandleComment] = useRecoilState(handleCommentState)
  const [useSSRComments, setUseSSRComments] = useRecoilState(useSSRCommentsState)

  // For Realtime comment
  useEffect(() => {
    let mounted = true;
    const fetchComments = async () => {
      const response = await fetch(`/api/comment/${id}`, {
        method: "GET",
        headers: { "Content-Type":"application/json" }
      });

      const responseData = await response.json();
      if(mounted) {
        setRealTimeComment(responseData);
        setHandleComment(false);
        setUseSSRComments(false);
      }
    }

    fetchComments()
    return () => {
      mounted = false;
    }
  }, [handleComment])

  return { realTimeComment, useSSRComments }
}

export default useFetchComment