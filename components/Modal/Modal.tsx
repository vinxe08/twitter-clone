import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IPosts } from "../../interfaces/Posts";
import { NextPage } from "next";
import ModalCard from "./ModalCard";
import { handleCommentState, useSSRCommentsState } from "../../atoms/commentAtom";

const gifYouUp = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};

interface IProps {
  post: IPosts | null
}

const Modal: NextPage<IProps> = ({post}) => {
  const { query: {id} } = useRouter()
  const [realTimeComment, setRealTimeComment] = useState<IPosts | null>()
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
        setRealTimeComment(responseData[0]);
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
        {!useSSRComments && realTimeComment
          ? <ModalCard post={realTimeComment}/>
          : <ModalCard post={post}/>
        }
    </>
  )
}

export default Modal