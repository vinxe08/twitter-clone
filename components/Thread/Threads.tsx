import { IPosts } from '../../interfaces/Posts'
import ThreadCard from './ThreadCard';
import CommentField from './CommentField'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { handleCommentState, useSSRCommentsState } from '../../atoms/commentAtom'
import CommentCard from './CommentCard';
import useFetchComment from '../../hooks/useFetchComment';

interface IThread {
  threads: IPosts[]
}

const Comment: React.FC<IThread> = ({threads}) => {
  const router = useRouter()
  const { id } = router.query

  const { realTimeComment, useSSRComments } = useFetchComment(id)

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
