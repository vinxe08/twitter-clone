import { XIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { useRef, useState } from 'react'
import { PhotographIcon, MenuAlt2Icon, EmojiHappyIcon } from '@heroicons/react/outline'
import { useRecoilState } from 'recoil'
import { loadingState } from '../../atoms/modalAtom'
import { handlePostState } from '../../atoms/postAtom'
import { IPosts } from '../../interfaces/Posts'
import Swal from 'sweetalert2'
import { motion } from "framer-motion";
import { Picker } from 'emoji-mart'
import { handleCommentState } from '../../atoms/commentAtom'

interface IProps {
  post: IPosts | null
}

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

const ModalField:React.FC<IProps> = ({post}) => {
  const {data: session} = useSession()
  const [input, setInput] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState(null || '')
  const [displayImage, setDisplayImage] = useState(null)
  const filePickerRef = useRef<any>(null)
  const [showEmojis, setShowEmojis] = useState<any>(false)
  const [loading, setLoading] = useRecoilState(loadingState)
  const [handleComment, setHandleComment] = useRecoilState(handleCommentState)


  const addImageToPost = (e: any) => {
    const reader = new FileReader();

    if(e.target.files[0]){ 
      reader.readAsDataURL(e.target.files[0]); 
    }

    reader.onload = (readerEvent: any) => {
      setDisplayImage(readerEvent.target.result);
    }
    setSelectedFile(e.target.files[0])
  }

  // Combines string and emoji in input field as value
  const addEmoji = (e:any) => {
    let sym = e.unified.split("-");
    let codesArray: any[] = [];
    sym.forEach((el:any) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray)
    setInput(input + emoji)
  }

  const replyPost = async (e:any) => {
    e.preventDefault();
    setLoading(true)

    const formData = new FormData();
    formData.append('file', selectedFile)// Contains File
    formData.append('upload_preset', 'my-twitter-uploads')// Presets for Cloudinary

    // Uploads photo in Cloudinary
    let data
    if(selectedFile){
      data = await fetch('https://api.cloudinary.com/v1_1/twitter-got-cloned/image/upload', {
        method: 'POST',
        body: formData,
      }).then(res => res.json())
    }

    if(data) {
      // Sends Data in MongoDB
      const response = await fetch('/api/comment', {
        method: "POST",
        body: JSON.stringify({
          id:post?._id,
          post: input,
          name: session?.user?.name,
          photoUrl: data?.url || null,
          username: session?.username,
          email:session?.user?.email,
          userImg: session?.user?.image,
          createdAt: new Date().toString(),
          likes:[],
          comment:[],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      // If upload succeed
      if(response){
        setLoading(false)
        setInput("")
        setShowEmojis(false)
        setDisplayImage(null)
        setHandleComment(true)
        Swal.fire({
        title: 'Done',
        icon: 'success',
        showConfirmButton: false,
        timer:1500,
      }) }
    }
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()} 
      className="flex space-x-3 w-full p-4 border-b-[1px]">
      <img src={`${session?.user?.image}`} alt="Post owner image" className="rounded-full h-12 w-12" />
      <div className="flex flex-col flex-grow">
        <h1 className='text-gray-500'>Replying to <span className='text-blue-400'>@{post?.name}</span></h1>
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="Tweet your reply" className="outline-none text-xl placeholder-gray-500 py-5 border-b-[1px] border-gray-100 scrollbar-hide flex-grow no-underline"/>
        { displayImage && (
          <div className='relative'>
            <div 
              className='absolute w-8 h-8  hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
              onClick={() =>  setDisplayImage(null)}
            >
              <XIcon className='text-gray-400 h-5'/>
            </div>
            <img src={displayImage} alt="" className='rounded-2xl max-h-52 object-contain' />
          </div>
        )}
        <div className="flex items-center pt-5 relative">
          <div onClick={() => filePickerRef?.current?.click()}>
            <PhotographIcon className="icon"/>
            <input
              type="file"
              hidden
              onChange={addImageToPost}
              ref={filePickerRef}
            />
          </div>
          <div className="icon flex items-center justify-center">
            <h1 className="text-[10px] text-blue-500 flex items-center justify-center border-[1px] h-[18px] w-5 border-blue-500 rounded-sm">GIF</h1>
          </div>
          <MenuAlt2Icon className="icon" />
          <EmojiHappyIcon className="icon" onClick={() => setShowEmojis(!showEmojis)} />
          <button 
            className="tweetButton" 
            disabled={!input.trim() && !displayImage}
            onClick={replyPost} >
              Tweet
          </button>
          { showEmojis && (
            <motion.div
              variants={gifYouUp}
              initial="hidden"
              animate="visible"
              exit="exit" 
              className='z-50'
            >
              <Picker 
                onSelect={addEmoji}
                style={{
                  position:'absolute',
                  marginTop:'30px',
                  marginLeft: -190,
                  maxWidth: "300px",
                  borderRadius: "20px"
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModalField