import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { ChatAlt2Icon, SwitchVerticalIcon, HeartIcon, UploadIcon } from '@heroicons/react/outline'
import {
  HeartIcon as HeartIconFilled,
  ChatAlt2Icon as ChatIconFilled,
} from "@heroicons/react/solid";
import { IPosts } from '../../interfaces/Posts'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { fullPostModalState, loadingState } from '../../atoms/modalAtom'
import { useSession } from 'next-auth/react';
import { routingState } from '../../atoms/routingAtom';
import { NextPage } from 'next';

interface IProps {
  posts: IPosts
}

const PostCard: NextPage<IProps> = ({posts}) => {
  const { data: session } = useSession();
  const { push } = useRouter()
  const [loading, setLoading] = useRecoilState(loadingState)
  const [fullModal, setFullModal] = useRecoilState(fullPostModalState)
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState<any[]>([])
  const [routeState, setRouteState] = useRecoilState(routingState)

  const redirectTo = (postsId:any) => {
    push(`/${postsId}`)
    setLoading(true)
    setRouteState(true)
  }

  const showPostImage = (post:IPosts) => {
    setFullModal(true)
    push(`/thread/${post._id}`)
  }

  // A function that if like is true, remove the element(session.user.name) in DB : add element(session.user.name) in DB 
  const likePost = async () => {
    if(liked) {
      setLiked(false)
      setLikes(posts?.likes?.filter(item => item != session?.user?.name))// Manually removing in likes

      await fetch('/api/liked', {
        method: "DELETE",
        body: JSON.stringify({
          id: posts._id,
          user:session?.user?.name
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    } else {
      setLiked(true)
      setLikes([session?.user?.name])// Manually adding in likes

      await fetch('/api/liked', {
        method: "POST",
        body: JSON.stringify({
          id: posts._id,
          likes:session?.user?.name
        }),
        headers: {
          "Content-Type": "application/json",
        }, })
    }
  }

  useEffect(() => {
    setLiked(posts?.likes?.includes(session?.user?.name))// Checking if the user is in list who likes
    setLikes(posts?.likes.map(like => {return like }))
  },[posts])

  return (
    <div    
      onClick={() => redirectTo(posts._id)}
      key={posts._id}
      className="flex space-x-2 px-4 pt-3 cursor-pointer hover:bg-gray-100 transition ease-in-out border-b-[1px] border-gray-100" >
      <div className='w-12'>
        <img 
          src={`${posts.userImg}`}
          alt="Post Owner Image"
          className="rounded-full h-[49px] min-w-[50px]" />
      </div>
        <div 
          className="pl-[0.4rem] flex flex-col flex-grow">
          <div 
            className="flex justify-start relative">
            <h1 className="font-bold text-gray-700 hover:underline">{posts.name}</h1>
            <h1 className="text-gray-600 ml-2">@{posts.username}</h1>
            <DotsHorizontalIcon className="h-7 w-7 px-[0.35rem]  text-gray-600 hover:bg-blue-200 transition ease-in-out rounded-full absolute right-2 " />
          </div>
          <p>{posts.post}</p>
          <div className="w-max h-max mt-2 relative block min-w-full">
            {posts.photoUrl  &&
              <Image 
                src={`${posts.photoUrl}`}
                alt="Overhaul Vs Deku"
                height={60}
                width={100}
                layout='responsive'
                className="rounded-xl"
                priority
                onClick={(e:any) => 
                  { e.stopPropagation()
                    showPostImage(posts)} }
              /> }
            </div>
            <div className="flex space-x-12 md:space-x-20 lg:space-x-28 pb-[6px]">
              <div 
                onClick={(e:any) =>  e.stopPropagation()}
                className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
                <ChatAlt2Icon className="h-5 w-5 "/>
                <h1 className="absolute top-[5px] -right-3">1</h1>
              </div>
            <div 
              onClick={(e:any) =>  e.stopPropagation()}
              className="hover:bg-green-100 hover:text-green-500 postIcon ">
              <SwitchVerticalIcon className="h-5 w-5 "/>
            </div>
            <div 
              onClick={(e:any) => 
                { likePost()
                  e.stopPropagation()
                }}
              className="hover:bg-red-100 hover:text-red-500 postIcon active:scale-90 transition ease-in-out">
              {liked ? (
                  <HeartIconFilled className="h-5 w-5 text-red-500 "/>
                ) : (
                  <HeartIcon className="h-5 w-5  "/>
                ) }
              {likes.length > 0 &&
                <h1 className="absolute top-[5px] -right-3">{likes.length}</h1>
              }
            </div>
            <div 
              onClick={(e:any) =>  e.stopPropagation()}
              className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
              <UploadIcon className="h-5 w-5 "/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default PostCard

