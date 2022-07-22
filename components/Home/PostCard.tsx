import React, { useEffect, useState } from 'react'
import { ChatIcon, SwitchVerticalIcon, HeartIcon, UploadIcon } from '@heroicons/react/outline'
import {
  DotsHorizontalIcon,
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { IPosts } from '../../interfaces/Posts'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { fullPostModalState, loadingState, commentModalState } from '../../atoms/modalAtom'
import { getPostState } from '../../atoms/postAtom'
import { useSession } from 'next-auth/react';
import { routingState } from '../../atoms/routingAtom';
import { NextPage } from 'next';
import ModalComment from '../Thread/ModalComment';
import TimeAgo from 'timeago-react';
import useFetchLike from '../../hooks/useFetchLike';

interface IProps {
  posts: IPosts
}

const PostCard: NextPage<IProps> = ({posts}) => {
  const { data: session } = useSession();
  const { push } = useRouter()
  const [loading, setLoading] = useRecoilState(loadingState)
  const [fullModal, setFullModal] = useRecoilState(fullPostModalState)
  const [commentModal, setCommentModal] = useRecoilState(commentModalState)
  const [postState, setPostState] = useRecoilState(getPostState)
  const [routeState, setRouteState] = useRecoilState(routingState)

  const { likes, liked, likePost } = useFetchLike(posts)

  const redirectTo = (postsId:any) => {
    push(`/thread/${postsId}`)
    setLoading(true)
    setRouteState(true)
  }

  const showPostImage = (post:IPosts) => {
    setFullModal(true)
    push(`/modal/${post?._id}`)
  }

  const showCommentModal = (post:IPosts) => {
    setCommentModal(true)
    setPostState(post)
  }

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
            className="flex justify-start relative space-x-2">
            <h1 className="font-bold text-gray-700 hover:underline">{posts.name}</h1>
            <h1 className="text-gray-600">@{posts.username} </h1>
            <h3><span>· </span>
                  <TimeAgo
                    datetime={posts.createdAt}
                    className='text-gray-500' /> 
                </h3>
            <DotsHorizontalIcon className="h-7 w-7 px-[0.35rem]  text-gray-600 hover:bg-blue-200 transition ease-in-out rounded-full absolute right-2 " />
          </div>
          <span>{posts.post}</span>
          <div className="mt-2 relative flex min-w-full max-h-[32rem]">
            {posts.photoUrl  &&
            <div className='flex'>
                <img 
                  src={`${posts.photoUrl}`}
                  alt="Overhaul Vs Deku"
                  className="object-contain rounded-xl"
                  onClick={(e:any) => 
                    { e.stopPropagation()
                      showPostImage(posts)} }
                /> 
              </div>
              }
            </div>
            <div className="flex space-x-12 md:space-x-20 lg:space-x-28 pb-[6px]">
              <div 
                onClick={(e:any) => 
                  {
                    e.stopPropagation()
                    showCommentModal(posts)
                  }}
                className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
                { posts?.comments?.find(comment => comment.name === session?.user?.name) 
                  ? ( <ChatIconFilled className="h-5 w-5 text-blue-500"/>)
                  : ( <ChatIcon className='h-5 w-5 '/>)
                 }
                { posts.comments?.length > 0 && <h1 className="absolute top-[5px] -right-3">{posts.comments.length}</h1>}
              </div>
            <div 
              onClick={(e:any) => e.stopPropagation()}
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
              {likes?.length > 0 &&
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
        {commentModal && 
          <ModalComment />
        }
      </div>
  )
}

export default PostCard

