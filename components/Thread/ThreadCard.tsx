import React, { useEffect, useRef, useState } from 'react'
import { ChatIcon, SwitchVerticalIcon, HeartIcon, UploadIcon } from '@heroicons/react/outline'
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { useSession } from 'next-auth/react'
import { IPosts } from '../../interfaces/Posts'
import { NextPage } from 'next'
import { useRecoilState } from 'recoil'
import { loadingState } from '../../atoms/modalAtom'
import { routingState } from '../../atoms/routingAtom'

interface IThread {
  thread: IPosts
}

const ThreadCard: NextPage<IThread> = ({thread}) => {
  const {data: session} = useSession()
  const [loading, setLoading] = useRecoilState(loadingState)
  const [routeState, setRouteState] = useRecoilState(routingState)
  const [liked, setLiked] = useState<boolean>(false)
  const [likes, setLikes] = useState<any[]>([])

  // A function that if like is true, remove the element(session.user.name) in DB : add element(session.user.name) in DB 
  const likePost = async () => {
    if(liked) {
      setLiked(false)
      setLikes(thread?.likes?.filter(item => item != session?.user?.name))// Manually removing in likes
      await fetch('/api/like', {
        method: "DELETE",
        body: JSON.stringify({
          id: thread._id,
          user:session?.user?.name
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    } else {
      setLiked(true)
      setLikes([session?.user?.name])// Manually adding in likes

      await fetch('/api/like', {
        method: "POST",
        body: JSON.stringify({
          id: thread._id,
          likes:session?.user?.name
        }),
        headers: {
          "Content-Type": "application/json",
        }, })
    }
  }

  useEffect(() => {
    setLoading(false)
    setRouteState(true)
  },[])

  useEffect(() => {
    setLiked(thread?.likes?.includes(session?.user?.name))
    setLikes(thread?.likes.map(like => {return like }))
  }, [thread])

  return (
    <div className='mt-[.5rem]'>
      <div className='flex px-4 '>
        { thread?.userImg &&
          <img  src={`${thread?.userImg}`} 
            alt="User Image" 
            className='rounded-full mr-[0.6rem] h-12' 
        />}
        <div className='flex flex-col'>
          <h1 className='text-[1.05rem] font-semibold text-gray-800'>{thread?.name}</h1>
          <h1 className='text-gray-600 text-[1.05rem]'>@{thread?.username}</h1>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='px-4 border-b-[1px]'>
          <p className='text-[1.48rem] font-normal text-gray-800 py-3 '>{thread?.post}</p>
          {thread?.photoUrl && (
            <img src={`${thread.photoUrl}`} alt="Post Image"
            className='rounded-xl object-contain ' />
          )}
          <div className='flex space-x-1 text-gray-600 text-base border-b-[1px] py-4'>
            <h1 className='cursor-pointer hover:underline transition ease-in-out'>{thread.createdAt.slice(0, 3)} · </h1>
            <h1>{thread.createdAt.slice(4, 15)} · </h1>
            <h1 className='cursor-pointer hover:underline transition ease-in-out'>Twitter Web App</h1>
          </div>
          <div className='flex space-x-4 border-b-[1px] py-4 text-[1.05rem] font-normal'>
            { likes && likes.length > 0 
                ? <div className="flex hover:underline transition ease-in-out cursor-pointer">
                  <h1 className="text-gray-900 font-semibold text-[1.05rem]">{likes.length} 
                    {likes.length > 1 
                      ?<span className="text-gray-500 font-normal text-[1rem] pl-1">Likes</span>
                      :<span className="text-gray-500 font-normal text-[1rem] pl-1">Like</span>
                    }</h1>
                </div>
                : null
              }
          </div>
          <div className="flex items-center justify-center space-x-12 md:space-x-20 lg:space-x-28 pb-[6px]">
            <div className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
              { thread?.comments?.find(comment => comment.name === session?.user?.name) 
                ? ( <ChatIconFilled className="h-6 w-6 text-blue-500"/>)
                : ( <ChatIcon className='h-6 w-6 '/>)
              }
            </div>
            <div className="hover:bg-green-100 hover:text-green-500 postIcon ">
              <SwitchVerticalIcon className="h-6 w-6 "/>
            </div>
            <div 
              onClick={(e:any) => 
                { likePost()
                  e.stopPropagation()
                }}
              className="hover:bg-red-100 hover:text-red-500 postIcon cursor-pointer postIcon active:scale-90 transition ease-in-out ">
              {liked ? (
                <HeartIconFilled className="h-6 w-6 text-red-500 "/>
              ) : (
                <HeartIcon className="h-6 w-6  "/>
              ) }
            </div>
            <div className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
              <UploadIcon className="h-6 w-6 "/>
            </div>
          </div>
        </div>
      </div>
    </div>       
  )
}

export default ThreadCard
