import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { fetchTweets } from '../utils/fetchTweets'
import {Tweet} from '../typings'
import { Toaster } from 'react-hot-toast'
import Profile from "../components/Profile"

interface Props{
  tweets: Tweet[]
}



const Home = ({tweets}: Props) => {
  console.log(tweets)

  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden"> 
      {/* I removed items-center justify-center from the className because it was causing a bug with the sidebar */}
      <Head>
        <title>Twitter 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster/>

      <main className="grid grid-cols-9">
        <Sidebar/>
        <Profile tweets={tweets}/>
        <Widgets/>
      </main>
    </div>
  )
}

export default Home


export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();
  return{
    props: {
      tweets
    }
  }
}