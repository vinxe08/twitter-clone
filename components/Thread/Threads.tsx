import { IPosts } from '../../interfaces/Posts'
import ThreadCard from './ThreadCard';
import CommentField from './CommentField'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { handleCommentState, useSSRCommentsState } from '../../atoms/commentAtom'
import CommentCard from './CommentCard';

interface IThread {
  threads: IPosts[]
}

const Comment: React.FC<IThread> = ({threads}) => {
  const [realTimeComment, setRealTimeComment] = useState<IPosts[]>([])
  const [handleComment, setHandleComment] = useRecoilState(handleCommentState)
  const [useSSRComments, setUseSSRComments] = useRecoilState(useSSRCommentsState)
  const router = useRouter()
  const { id } = router.query

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

  return (
    <>
      {!useSSRComments
        ? realTimeComment.map(tweet =>
          <div key={tweet._id}>
            <ThreadCard thread={tweet} /> 
            <CommentField thread={tweet} />
            {/* Map all comments */}
            {tweet.comments.map((comment, index) => 
              <CommentCard thread={comment} key={index} postOwner={tweet.name}  />)}
          </div> )
        :threads.map(thread => 
          <div key={thread._id}>
            <ThreadCard thread={thread} /> 
            <CommentField thread={thread} />
            {/* Map all comments */}
            {thread.comments.map((comment, index) => 
              <CommentCard thread={comment} key={index} postOwner={thread.name} />)}
          </div> )
      }
    </>
  )
}

export default Comment
