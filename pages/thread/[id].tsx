import Layout from '../../components/Layout'
import { connectToDatabase } from '../../util/mongodb'
import { IPosts } from '../../interfaces/Posts'
import { GetServerSideProps, NextPage } from 'next'
import { ObjectId } from 'mongodb'
import Threads from '../../components/Thread/Threads'

interface IThread {
  threads: IPosts[]
}

const Thread: NextPage<IThread> = ({ threads }) => {

  return (
    <Layout >
      <div>
        <Threads threads={threads}/>
      </div>
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
      threads: posts.map((post:IPosts) => ({
        _id: post._id.toString(),
        post: post.post,
        name: post.name,
        photoUrl: post?.photoUrl || null,
        username: post.username,
        email:post.email || null,
        userImg: post.userImg,
        createdAt: post.createdAt,
        likes:post.likes || null,
        comments: post.comments.map((data:IPosts) => ({
          post: data.post,
          name: data.name,
          photoUrl: data.photoUrl || null,
          username: data.username,
          email: data.email || null,
          userImg: data.userImg,
          createdAt: data.createdAt,
          likes: data.likes,
        })) || null
      })),
    }
  }
}
