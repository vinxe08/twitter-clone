import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IPosts } from "../../interfaces/Posts";
import { NextPage } from "next";
import ModalCard from "./ModalCard";
import { handleCommentState, useSSRCommentsState } from "../../atoms/commentAtom";
import useFetchComment from "../../hooks/useFetchComment";

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
  post: IPosts
}

const Modal: NextPage<IProps> = ({post}) => {
  const { query: {id} } = useRouter()

  const { realTimeComment, useSSRComments } = useFetchComment(id)

  return (
     <>
        {!useSSRComments && realTimeComment
          ? realTimeComment.map(comment => 
            <div key={comment._id}>
              <ModalCard post={comment}/>
            </div>
            )
          : <ModalCard post={post}/>
        }
    </>
  )
}

export default Modal