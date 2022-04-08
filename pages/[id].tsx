import React, { useEffect, useRef, useState } from 'react'
import { ChatAlt2Icon, SwitchVerticalIcon, HeartIcon, UploadIcon, PhotographIcon, MenuAlt2Icon, EmojiHappyIcon, CalendarIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { XIcon } from '@heroicons/react/solid'
import Comment from '../components/Thread/Comment'
import Layout from '../components/Layout'
import { Picker } from "emoji-mart"
import { connectToDatabase } from '../util/mongodb'
import { IPosts } from '../interfaces/Posts'
import { GetServerSideProps, NextPage } from 'next'
import { ObjectId } from 'mongodb'
import { useRecoilState } from 'recoil'
import { loadingState } from '../atoms/modalAtom'

interface IThread {
  thread: IPosts[]
  id:any
}

const Thread: React.FC<IThread> = ({thread, id}) => {
  const {data: session} = useSession()
  const [input, setInput] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [showEmojis, setShowEmojis] = useState<any>(false)
  const filePickerRef = useRef<any>(null)
  const [loading, setLoading] = useRecoilState(loadingState)

  const addImageToPost = () => {

  }

  const addEmoji = (e:any) => {
    let sym = e.unified.split("-");
    let codesArray: any[] = [];
    sym.forEach((el:any) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray)
    setInput(input + emoji)
  }

  useEffect(() => (
    setLoading(false)
  ))

  return (
    <Layout >
      { thread.map((post) => (
        <div className='mt-[.5rem]' key={post._id}>
          <div className='flex px-4 '>
          {  post?.userImg &&
            <img src={`${post?.userImg}`} alt="User Image" className='rounded-full mr-[0.6rem] h-12' />}
            <div className='flex flex-col'>
              <h1 className='text-[1.05rem] font-semibold text-gray-800'>{post?.name}</h1>
              <h1 className='text-gray-600 text-[1.05rem]'>@{post?.username}</h1>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='px-4 border-b-[1px]'>
              <p className='text-[1.48rem] font-normal text-gray-800 py-3 '>{post?.post}</p>
              {post?.photoUrl && (
                <img src={`${post.photoUrl}`} alt="Post Image"
                className='rounded-xl object-contain ' />
              )}
              <div className='flex space-x-1 text-gray-600 text-base border-b-[1px] py-4'>
                <h1 className='cursor-pointer hover:underline transition ease-in-out'>{post.createdAt.slice(0, 3)} · </h1>
                <h1>{post.createdAt.slice(4, 15)} · </h1>
                <h1 className='cursor-pointer hover:underline transition ease-in-out'>Twitter Web App</h1>
              </div>
              <div className='flex space-x-4 border-b-[1px] py-4 text-[1.05rem] font-normal'>
                <h1 className='cursor-pointer hover:underline'>0 <span className='text-gray-600'>Retweets</span></h1>
                <h1 className='cursor-pointer hover:underline'>0 <span className='text-gray-600'>Quote Tweets</span></h1>
                <h1 className='cursor-pointer hover:underline'>0 <span className='text-gray-600'>Likes</span></h1>
              </div>
              <div className="flex items-center justify-center space-x-12 md:space-x-20 lg:space-x-28 pb-[6px]">
                <div className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
                  <ChatAlt2Icon className="h-6 w-6 "/>
                </div>
                <div className="hover:bg-green-100 hover:text-green-500 postIcon ">
                  <SwitchVerticalIcon className="h-6 w-6 "/>
                </div>
                <div className="hover:bg-red-100 hover:text-red-500 postIcon ">
                  <HeartIcon className="h-6 w-6 "/>
                </div>
                <div className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
                  <UploadIcon className="h-6 w-6 "/>
                </div>
              </div>
            </div>
            <div className='flex px-4 py-2 space-x-3 border-b-[1px]'>
              <img 
                src={`${session?.user?.image}`} 
                alt="User Photo"
                className='rounded-full h-12 mt-6'
                />
              <div className='flex flex-col flex-grow'>
                <h1 className='cursor-pointer text-gray-500'>Replying to <span className='text-blue-500'>@Post Owner</span></h1>
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={1}
                    placeholder="Tweet your reply" className="outline-none text-xl placeholder-gray-500 py-5  scrollbar-hide" />

              { selectedFile && (
                <div className='relative'>
                  <div 
                    className='absolute w-8 h-8  hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
                    onClick={() => setSelectedFile(null)}
                  >
                    <XIcon className='text-gray-400 h-5'/>
                  </div>
                  <img src={selectedFile} alt="" className='rounded-2xl max-h-80 object-contain' />
                </div>
              )}

              {/* Add File/Emojis Section */}
              <div className="flex items-center py-5 space-x-1 lg:space-x-2 relative z-40">
                <div onClick={() => filePickerRef?.current?.click()}>    
                  <PhotographIcon className="icon" />
                  <input 
                    type="file"
                    hidden 
                    onChange={addImageToPost} 
                    ref={filePickerRef} />
                </div>
                <div className="icon flex items-center justify-center">
                <h1 className="text-[10px] text-blue-500 flex items-center justify-center border-[1px] h-[18px] w-5 border-blue-500 rounded-sm">GIF</h1></div>
                <MenuAlt2Icon className="icon" />
                <EmojiHappyIcon className="icon" onClick={() => setShowEmojis(!showEmojis)} />
                <CalendarIcon className="icon" />
                <button className="tweetButton" disabled={!input.trim() && !selectedFile}>Reply</button>

                { showEmojis && (
                  <Picker 
                    onSelect={addEmoji}
                    style={{
                    position:'absolute',
                    marginTop:'465px',
                    marginLeft: -40,
                    maxWidth: "320px",
                    borderRadius: "20px"
                    }}
                  /> )}
                </div>
              </div>
            </div>
            {/* Map all the Comments */}
            <Comment />
          </div>
        </div>    
        ))   
      }
    </Layout>
  )
}

export default Thread

export const getServerSideProps: GetServerSideProps = async({ query }) => {
  const id = query.id
  const { db } = await connectToDatabase()

  let o_id = new ObjectId(`${id}`)
  let posts
  if(id){
    posts = await db.collection("posts").find({_id: o_id}).sort({timestamp: -1}).toArray();
  }

  return {
    props: {
      thread: posts.map((post:IPosts) => ({
        _id: post._id.toString(),
        post: post.post,
        name: post.name,
        photoUrl: post?.photoUrl || null,
        username: post.username,
        email:post.email || null,
        userImg: post.userImg,
        createdAt: post.createdAt,
      })),
      id
    }
  }
}
