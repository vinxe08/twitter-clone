import { AnimatePresence } from 'framer-motion'
import { ObjectId } from 'mongodb'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { fullPostModalState } from '../../atoms/modalAtom'
import Modal from '../../components/Modal/Modal'
import { IPosts } from '../../interfaces/Posts'
import { connectToDatabase } from '../../util/mongodb'

interface IState {
  thread: IPosts[]
}

const Home: NextPage<IState> = ({ thread }) => {  
  const [fullModal, setFullModal] = useRecoilState(fullPostModalState)
  const { push } = useRouter()

  useEffect(() => {
    if(!fullModal){
      push('/thread')
    }
  })

  return (
    <>
      <AnimatePresence>
        {fullModal && 
          thread.map(post => (
              <Modal key={post._id} post={post}/>
          ))
        } 
      </AnimatePresence>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  
  // Get posts on SSR
  const id = query.id
  const { db } = await connectToDatabase()

  let o_id = new ObjectId(`${id}`)
  let posts
  if(id){
    posts = await db.collection("posts").find({_id: o_id}).toArray();
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
          likes: post.likes || null,
          comments: post.comments.map((data:IPosts) => ({
            post: data.post,
            name: data.name,
            photoUrl: data.photoUrl || null,
            username: data.username,
            email: data.email || null,
            userImg: data.userImg,
            createdAt: data.createdAt,
            likes: data.likes || null
          })) || null
      }))
    }
  }
}
