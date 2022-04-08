import type { NextPage } from 'next'
import Head from 'next/head'
import PostCard from '../components/Home/PostCard'
import PostField from '../components/Home/PostField'
import Layout from '../components/Layout'

const Second: NextPage = () => {
  return (
    <Layout >
      <div className="flex flex-col">
        <h1>SECOND PAGE</h1>
      </div>
    </Layout>
  )
}

export default Second


