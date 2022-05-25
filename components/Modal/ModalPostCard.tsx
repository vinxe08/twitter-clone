import React, { useEffect, useState } from 'react'
import { ChatIcon, SwitchVerticalIcon, HeartIcon, UploadIcon } from '@heroicons/react/outline'
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { IPosts } from '../../interfaces/Posts';
import { useSession } from 'next-auth/react';

interface IProps {
  post: IPosts | null
}


const ModalPostCard:React.FC<IProps> = ({post}) => {
  const {data: session} = useSession()
  
  const [liked, setLiked] = useState<boolean | null>()
  const [likes, setLikes] = useState<any[] | null>()

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
    <div className='px-4 py-3'>
          <div className='flex'>
            <img 
              src={`${post?.userImg}`}
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
            <div className="flex items-center justify-between border-b-[1px] py-3 h-10">
              {/* retweeets & etc */}
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
              {/* END */}
            </div>
            <div>
              <div className="flex justify-evenly pb-[6px] border-b-[1px] ">
                <div className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
                  { post?.comments?.find(comment => comment.name === session?.user?.name) 
                    ? ( <ChatIconFilled className="h-6 w-7 text-blue-500"/>)
                    : ( <ChatIcon className='h-6 w-7 '/>)
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
                  className="hover:bg-red-100 hover:text-red-500 postIcon active:scale-90 transition ease-in-out ">
                  {liked ? (
                    <HeartIconFilled className="h-6 w-6 text-red-500 "/>
                      ) : (
                        <HeartIcon className="h-6 w-6  "/>
                  ) }
                  {likes && likes.length > 0 ?
                    <h1 className="absolute top-[5px] -right-3">{likes?.length}</h1>
                    : null
                  }
                </div>
                <div className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
                  <UploadIcon className="h-6 w-6 "/>
                </div>
              </div>
          </div>
        </div>
  )
}

export default ModalPostCard