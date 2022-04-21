import { AnimatePresence } from 'framer-motion'
import { ObjectId } from 'mongodb'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { fullPostModalState, postModalState } from '../../atoms/modalAtom'
import PostField from '../../components/Home/PostField'
import Posts from '../../components/Home/Posts'
import Layout from '../../components/Layout'
import Modal from '../../components/Thread/Modal'
import { IPosts } from '../../interfaces/Posts'
import { connectToDatabase } from '../../util/mongodb'

interface IState {
  thread: IPosts[]
}

const Home: NextPage<IState> = ({ thread }) => {  
  const fullModal = useRecoilValue(fullPostModalState)

  return (
    <Layout>
        <AnimatePresence>
          { fullModal && 
              thread.map(post => (
                <div key={post._id}>
                  <Modal post={post}/>
                </div>
              ))
          }
        </AnimatePresence>
    </Layout>
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
          email:post.email,
          userImg: post.userImg,
          createdAt: post.createdAt,
          likes: post.likes || null
      }))
    }
  }
}
