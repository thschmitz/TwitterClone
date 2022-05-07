import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col py-2"> 
      {/* I removed items-center justify-center from the className because it was causing a bug with the sidebar */}
      <Head>
        <title>Twitter 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Sidebar/>

        <Feed/>
        
        <Widgets/>
      </main>
    </div>
  )
}

export default Home
