import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { fullPostModalState } from "../../atoms/modalAtom";
import { ChatAlt2Icon, SwitchVerticalIcon, HeartIcon, UploadIcon, XIcon } from '@heroicons/react/outline'
import {
  HeartIcon as HeartIconFilled,
  ChatAlt2Icon as ChatIconFilled,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IPosts } from "../../interfaces/Posts";
import { NextPage } from "next";

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
  const {data: session} = useSession()
  const [fullModal, setFullModal] = useRecoilState(fullPostModalState)
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState<any[]>([])
  const { push } = useRouter()

  const closeModal = () => { push('/thread') }

  // A function that if like ? remove the element(session.user.name) in DB : add element(session.user.name) in DB 
  const likePost = async () => {
    if(liked) {
      setLiked(false)
      setLikes(post?.likes?.filter( item => item != session?.user?.name))// Manually removing in likes

      // Removing the name(session.user.name) in DB
      await fetch('/api/liked', {
        method: "DELETE",
        body: JSON.stringify({
          id: post._id,
          user:session?.user?.name
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    } else {
      setLiked(true)
      setLikes([session?.user?.name])// Manually adding in likes

      // Adding the name(session.user.name) in DB
      await fetch('/api/liked', {
        method: "POST",
        body: JSON.stringify({
          id: post._id,
          likes:session?.user?.name
        }),
        headers: {
          "Content-Type": "application/json",
        }, }) 
    }
  }

  useEffect(() => {
    setLiked(post?.likes?.includes(session?.user?.name))
    setLikes(post?.likes.map( pst => {return pst}))
  },[post])

  return (
    <motion.div
      className='fixed w-full h-full left-0 top-0 bg-[#030303a8] z-50 flex'
      onClick={closeModal}
      variants={gifYouUp}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="flex flex-grow relative"
      >
        <div 
          onClick={() => setFullModal(false)}
          className="bg-[#03030370] hover:bg-[#36363670] rounded-full p-[.3rem] absolute top-[14px] left-[14px] transition ease-in-out cursor-pointer active:scale-95 ">
          <XIcon className="h-[22px] w-[22px] text-white"/>
        </div>
        <motion.img
          alt=""
          // onDoubleClick={handleClose}
          src={`${post.photoUrl}`}
          className="object-contain w-screen max-h-[90%] pt-8 "
        />
        <div>

        </div>
      </motion.div>
        <div className="hidden lg:block w-[28.3rem] bg-white dark:bg-[#1D2226] px-5 py-3">
          <div>
            <div className='flex'>
              <img 
                src={`${post.userImg}`}
                alt="Post Owner Image"
                className="rounded-full h-[49px] min-w-[50px]" />
              <div className='flex flex-col ml-3'>
                <h1 className='text-[1.05rem] font-semibold text-gray-800'>{post?.name}</h1>
                <h1 className='text-gray-600 text-[1rem]'>@{post?.username}</h1>
              </div>
            </div>

            <p className='text-[1.48rem] font-normal text-gray-800 py-3 '>{post?.post}</p>

            <div className='flex space-x-1 text-gray-600 text-base border-b-[1px] py-4'>
              <h1 className='cursor-pointer hover:underline transition ease-in-out'>{post?.createdAt?.slice(0, 3)} · </h1>
                <h1>{post?.createdAt?.slice(4, 15)} · </h1>
                <h1 className='cursor-pointer hover:underline transition ease-in-out'>Twitter Web App</h1>
              </div>
              <div className="flex justify-between border-b-[1px] py-3">
                {/* 1 Quote Tweet 1 Like */}
                <div className="flex space-x-1 hover:underline transition ease-in-out cursor-pointer">
                  <h1 className="text-gray-900 font-semibold text-[1.05rem]">81 <span className="text-gray-500 font-normal text-[1rem]">Retweets</span></h1>
                </div>
                <div className="flex space-x-1 hover:underline transition ease-in-out cursor-pointer">
                  <h1 className="text-gray-900 font-semibold text-[1.05rem]">1 <span className="text-gray-500 font-normal text-[1rem]">Quote Tweet</span></h1>
                </div>
                <div className="flex space-x-1 hover:underline transition ease-in-out cursor-pointer">
                  <h1 className="text-gray-900 font-semibold text-[1.05rem]">1,465 <span className="text-gray-500 font-normal text-[1rem]">Likes</span></h1>
                </div>
              </div>
              <div>
                <div className="flex justify-evenly pb-[6px] border-b-[1px] ">
                  <div className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
                    <ChatAlt2Icon className="h-6 w-7 "/>
                  </div>
                  <div className="hover:bg-green-100 hover:text-green-500 postIcon ">
                    <SwitchVerticalIcon className="h-6 w-6 "/>
                  </div>
                  <div 
                    onClick={(e:any) => 
                      { likePost()
                        e.stopPropagation()
                      }}
                    className="hover:bg-red-100 hover:text-red-500 postIcon active:scale-90 transition ease-in-out ">
                    {liked ? (
                      <HeartIconFilled className="h-6 w-6 text-red-500 "/>
                        ) : (
                          <HeartIcon className="h-6 w-6  "/>
                    ) }
                    {likes.length > 0 &&
                      <h1 className="absolute top-[5px] -right-3">{likes.length}</h1>}
                  </div>
                  <div className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
                    <UploadIcon className="h-6 w-6 "/>
                  </div>
                </div>
            </div>
          </div>
        </div>
      <div>
        {/* Tweet your reply SECTION */}
      </div>
    </motion.div>
  )
}

export default Modal