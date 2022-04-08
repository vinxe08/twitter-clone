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
import { getPostState } from '../../atoms/postAtom'
import { fullPostModalState, loadingState } from '../../atoms/modalAtom'
import { useSession } from 'next-auth/react';
// import { ObjectId } from 'mongodb';

interface IProps {
  posts: IPosts
}

const PostCard: React.FC<IProps> = ({posts}) => {
  const { data: session } = useSession();
  const [post, setPost] = useRecoilState(getPostState)
  const { push } = useRouter()
  const [loading, setLoading] = useRecoilState(loadingState)
  const [fullModal, setFullModal] = useRecoilState(fullPostModalState)
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState([])

  const redirectTo = (postsId:any, posts:IPosts) => {
    setPost(posts)
    push(`/${postsId}`)
    setLoading(true)
  }

  const showPostImage = (post:IPosts) => {
    setPost(post)
    console.log('Post: ',post);
    setFullModal(true)
  }

  // Add function that will try to find the ID, if the ID is in likes? setLiked(true) : false
  useEffect(() => {
    setLiked(posts?.likes?.includes(session?.user?.name))
  },[posts])

  // A function that if like ? remove the element(session.user.name) in DB : add element(session.user.name) in DB 
  const likePost = async (e:any) => {
    e.preventDefault()

    if(liked) {
      setLiked(false)
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
      await fetch('/api/liked', {
        method: "POST",
        body: JSON.stringify({
          id: posts._id,
          likes:session?.user?.name
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    }
  }

  return (
    <div 
      key={posts._id}
      className="flex space-x-2 px-4 pt-3 cursor-pointer hover:bg-gray-100 transition ease-in-out border-b-[1px] border-gray-100"
    >
      <div className='w-12'>
        <img 
          src={`${posts.userImg}`}
          alt="Post Owner Image"
          className="rounded-full h-[49px] min-w-[50px]" />
      </div>
        <div className="pl-[0.4rem] flex flex-col flex-grow">
          <div 
            className="flex justify-start relative" 
            onClick={() => redirectTo(posts._id, posts)}>
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
                onClick={() => showPostImage(posts)}
              /> }
            </div>
            <div className="flex space-x-12 md:space-x-20 lg:space-x-28 pb-[6px]">
              <div className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
                <ChatAlt2Icon className="h-5 w-5 "/>
                <h1 className="absolute top-[5px] -right-3">1</h1>
              </div>
            <div className="hover:bg-green-100 hover:text-green-500 postIcon ">
              <SwitchVerticalIcon className="h-5 w-5 "/>
            </div>
            <div 
              onClick={likePost}
              className="hover:bg-red-100 hover:text-red-500 postIcon active:scale-90 transition ease-in-out">
              {/* <HeartIcon className="h-5 w-5 "/>
              <h1 className="absolute top-[5px] -right-3">1</h1> */}

              {liked ? (
                  <HeartIconFilled className="h-5 w-5 text-red-500 "/>
                ) : (
                  <HeartIcon className="h-5 w-5  "/>
                )
                }
              {likes.length > 0 &&
                <h1 className="absolute top-[5px] -right-3">{likes.length}</h1>}
            </div>
            <div className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
              <UploadIcon className="h-5 w-5 "/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default PostCard

