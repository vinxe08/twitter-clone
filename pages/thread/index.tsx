import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { postModalState } from '../../atoms/modalAtom'
import PostField from '../../components/Home/PostField'
import Posts from '../../components/Home/Posts'
import Layout from '../../components/Layout'
import { IPosts } from '../../interfaces/Posts'
import { connectToDatabase } from '../../util/mongodb'

interface IState {
  posts: IPosts[]
}

const Home: NextPage<IState> = ({ posts }) => {
  // Checking if Authenticated(Client Side)
  const router = useRouter()
  const { data:session ,status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/")
    },
  })

  const postModal = useRecoilValue(postModalState)

  return (
    <Layout >
        <div>
          <PostField />
          <Posts posts={posts}/>
        </div>
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  // Checking if Authenticated(Server Side)
  const session = await getSession(context);
  if(!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    }
  }

  // Get posts on SSR
  const { db } = await connectToDatabase()
  const posts = await db.collection("posts").find().sort({timestamp: -1}).toArray();

  return {
    props: {
      session,
      posts: posts.map((post:IPosts) => ({
          _id: post._id.toString(),
          post: post.post,
          name: post.name,
          photoUrl: post?.photoUrl || null,
          username: post.username,
          email:post.email,
          userImg: post.userImg,
          createdAt: post.createdAt,
      }))
    }
  }
}
