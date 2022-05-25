import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { commentModalState, loadingState } from "../../atoms/modalAtom";
import { XIcon } from '@heroicons/react/outline'
import { useSession } from "next-auth/react";
import { getPostState, handlePostState } from "../../atoms/postAtom";
import TimeAgo from "timeago-react";
import { useRef, useState } from "react";
import { PhotographIcon, MenuAlt2Icon, EmojiHappyIcon, CalendarIcon } from '@heroicons/react/outline'
import { Picker } from 'emoji-mart'
import Swal from 'sweetalert2'

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

const ModalComment = () => {
  const {data: session} = useSession()
  const [commentModal, setCommentModal] = useRecoilState(commentModalState)
  const [post, setPost] = useRecoilState(getPostState)
  const [input, setInput] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState(null || '')
  const [displayImage, setDisplayImage] = useState(null)
  const [showEmojis, setShowEmojis] = useState<any>(false)
  const filePickerRef = useRef<any>(null)
  const [loading, setLoading] = useRecoilState(loadingState)
  const [handlePost, setHandlePost] = useRecoilState(handlePostState)

  const closeModal = (e:any) => { 
    e.stopPropagation()
    setCommentModal(false)
    setPost(null)
  }

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
    const data = await fetch('https://api.cloudinary.com/v1_1/twitter-got-cloned/image/upload', {
      method: 'POST',
      body: formData,
    }).then(res => res.json())

    if(data) {
      // Sends Data in MongoDB
      const response = await fetch('/api/comment', {
        method: "POST",
        body: JSON.stringify({
          id:post?._id,
          post: input,
          name: session?.user?.name,
          photoUrl: data?.url,
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
        setCommentModal(false)
        setHandlePost(true)
        Swal.fire({
        title: 'Done',
        icon: 'success',
        showConfirmButton: false,
        timer:1500,
      }) }
    }
  }

  return (
    <motion.div
      className='fixed w-full h-full -left-2 top-0 z-40 flex flex-grow items-start justify-center sm:p-8' 
      onClick={(e:any) => e.stopPropagation()}
      variants={gifYouUp}
      initial="hidden"
      animate="visible"
      exit="exit" >
        <div 
          onClick={closeModal}
          className='fixed w-full h-full left-0 top-0 bg-[#3534342d] z-40 flex flex-grow items-start justify-center sm:p-8'>
        </div>
        <div className="flex flex-col w-full h-full sm:h-auto sm:w-[590px] bg-white dark:bg-[#1D2226] px-5 pb-3 pt-[68px] sm:rounded-2xl relative z-50">
          <div 
            onClick={closeModal}
            className=" hover:bg-[#36363628] rounded-full p-[.3rem] absolute top-[14px] left-[14px] transition ease-in-out cursor-pointer active:scale-95 ">
            <XIcon className="h-[22px] w-[22px] text-black"/>
          </div>
          {/* POST TITLE */}
          <div className="flex pb-1 space-x-4">
            <div className="flex flex-col items-center justify-center space-y-1">
              <img src={post?.userImg} alt="Post owner image" className="rounded-full" />
              <div className="w-[2px] flex-grow bg-gray-300"></div>
            </div>
            <div className="flex flex-col">
              <div className="flex space-x-2">
                <h1 className="text-gray-800 text-md font-bold">{post?.name}</h1>
                <h2 className="text-gray-500 font-semibold">@{post?.username}</h2>
               { post?.createdAt &&
                <h3><span>· </span>
                  <TimeAgo
                    datetime={post.createdAt}
                    className='text-gray-500' /> 
                </h3> }
              </div>
              <h1 className="text-gray-700">{post?.post}</h1>
              <h1 className="py-[15px] text-gray-500 text-base">Replying to <span className="text-blue-400">@{post?.username}</span></h1>
            </div>
          </div>
          {/* POST FIELD */}
          <div className="flex space-x-4 w-full">
            <img src={`${session?.user?.image}`} alt="Post owner image" className="rounded-full h-12 w-12" />
            <div className="flex flex-col flex-grow">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
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
              <div className="flex items-center pt-5 space-x-1 lg:space-x-4 relative">
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
                <CalendarIcon className="icon" />
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
                  >
                    <Picker 
                      onSelect={addEmoji}
                      style={{
                        position:'absolute',
                        marginTop:'-440px',
                        marginLeft: -380,
                        maxWidth: "320px",
                        borderRadius: "20px"
                      }}
                    />
                  </motion.div>
              )}
              </div>
            </div>
          </div>
          
        </div>
    </motion.div>
  )
}

export default ModalComment