import React, { useEffect, useState } from 'react'
import { XIcon, ChatIcon, HeartIcon, SwitchVerticalIcon, UploadIcon, DotsHorizontalIcon } from '@heroicons/react/outline'
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { IPosts } from '../../interfaces/Posts'
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { loadingState } from '../../atoms/modalAtom';
import { routingState } from '../../atoms/routingAtom';

interface IProps {
  post: IPosts | null
}

const ModalPhoto: React.FC<IProps> = ({post}) => {
  const { push } = useRouter()
  const { data: session } = useSession()
  const [liked, setLiked] = useState<boolean | null>()
  const [likes, setLikes] = useState<any[] | null>()
  const [showTweet, setShowTweet] = useState<boolean>(false)
  const [loading, setLoading] = useRecoilState(loadingState)
  const [routeState, setRouteState] = useRecoilState(routingState)

  const closeModal = () => { push('/thread') }

  const redirectTo = (postsId:any) => {
    push(`/thread/${postsId}`)
    setLoading(true)
    setRouteState(true)
  }

  const likePost = async () => {
    if(liked) {
      setLiked(false)
      setLikes(post?.likes?.filter( item => item != session?.user?.name))// Manually removing in likes

      // Removing the name(session.user.name) in DB
      await fetch('/api/like', {
        method: "DELETE",
        body: JSON.stringify({
          id: post?._id,
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
      await fetch('/api/like', {
        method: "POST",
        body: JSON.stringify({
          id: post?._id,
          likes:session?.user?.name
        }),
        headers: {
          "Content-Type": "application/json",
        }, }) 
    }
  }

  useEffect(() => {
    setLiked(post?.likes?.includes(session?.user?.name))
    setLikes(post?.likes?.map( pst => {return pst}))
  },[post])

  return (
    <div className="h-full flex flex-col flex-grow items-center justify-items-start relative" >
        <div 
          onClick={closeModal}
          className=" hover:bg-[#97969670] rounded-full p-[.3rem] absolute top-[14px] left-[14px] transition ease-in-out cursor-pointer active:scale-95 ">
          <XIcon className="h-[22px] w-[22px] text-white"/>
        </div>
        <img
          alt="Post Picture"
          onClick={e => e.stopPropagation()}
          src={`${post?.photoUrl}`}
          className="object-contain h-[90%] w-screen flex-grow"
        />
        <div onClick={e => {
          setShowTweet(true)
          e.stopPropagation()
        }}
          className="hover:bg-[#97969670] rounded-full p-[.3rem] absolute top-[14px] right-[14px] transition ease-in-out cursor-pointer active:scale-95 lg:hidden ">
            <DotsHorizontalIcon className="h-[22px] w-[22px] text-white"/>
        </div>
        {showTweet && 
          <button onClick={e => {
            redirectTo(post?._id)
            e.stopPropagation()
            }}
            className='absolute top-[16px] right-[14px]  bg-white px-[.9rem] py-[.9rem] rounded-sm active:scale-95 transition ease-in-out lg:hidden'>View Tweet</button> }
        <div className='w-full flex justify-evenly py-[0.3rem]'>
          <div onClick={e => e.stopPropagation()}
            className="hover:bg-[#03030370] hover:text-blue-500 photoIcon ">
            { post?.comments?.find(comment => comment.name === session?.user?.name) 
              ? ( <ChatIconFilled className="h-6 w-7 text-blue-500"/>)
              : ( <ChatIcon className='h-6 w-7 '/>)
            }
            {post?.comments && post.comments.length > 0 
              ? <h1 className="absolute top-[7px] -right-3">{post?.comments.length}</h1>
              : null
            }
          </div>
          <div onClick={e => e.stopPropagation()}
            className="hover:bg-[#03030370] hover:text-green-500 photoIcon ">
            <SwitchVerticalIcon className="h-6 w-6"/>
          </div>
          <div onClick={e => {
            likePost()
            e.stopPropagation()
          }}
            className="hover:bg-[#03030370] hover:text-red-500 photoIcon ">
            {liked 
              ? ( <HeartIconFilled className="h-6 w-6 text-red-500 "/> ) 
              : ( <HeartIcon className="h-6 w-6  "/> ) }
            {likes && likes.length > 0 
              ? <h1 className="absolute top-[7px] -right-3">{likes?.length}</h1>
              : null
            }
          </div>
          <div onClick={e => e.stopPropagation()}
            className="hover:bg-[#03030370] photoIcon hover:text-blue-500 ">
            <UploadIcon className="h-6 w-6 "/>
          </div>
        </div>
      </div>
  )
}

export default ModalPhoto
