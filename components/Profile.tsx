import React, {useState, useEffect} from 'react'
import {useSession} from "next-auth/react"
import {fetchTweets} from "../utils/fetchTweetsProfile";
import {Tweet} from '../typings'
import { RefreshIcon } from '@heroicons/react/outline'
import toast from "react-hot-toast";
import TweetComponent from "./Tweet";
interface Props{
  tweets: Tweet[]
}


const Profile = ({tweets: tweetsProps}:Props) => {
  const {data: session} = useSession()
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProps)

  const handleRefresh = async function() {
    

    const refreshToast = toast.loading("Refreshing...")
    const tweets = await fetchTweets(session?.user?.image);
    setTweets(tweets)

    toast.success("Profile Updated", {
      id: refreshToast
    })
  }

  useEffect(async ()=>{
      const tweets = await fetchTweets(session?.user?.image);
      setTweets(tweets)
  })

  return (
    <div className="col-span-7 border-x max-h-screen scrollbar-hide overflow-scroll lg:col-span-5">
        <div className="flex item-center justify-between">
            <h1 className="p-5 pb-0 text-xl font-bold">Profile</h1>
        </div>

        <div className="bg-twitter h-40 mt-5"></div>

        <div className="flex">
          <div className="informations">
            <div className="name">
              <img src={session?.user?.image || "https://links.papareact.com/gll"} alt="" className="ml-10 w-20 h-20 rounded-full -mt-10"/>
            </div>
            <div className="name">
              <h1 className="text-lg ml-2">{session?.user?.name || "Unknown"}</h1>
              <h1 className="text-sm ml-2">@{session?.user?.name?.replace(/\s+/g, "").toLocaleLowerCase() || "Unknown"}</h1>
            </div>
            <div className="login">
              <h1 className="text-sm ml-2 mt-4">Ultima vez logado</h1>
            </div>
            <div className="flex">
              <h3 className="ml-2 mt-4"><b>1</b> Following</h3>
              <h3 className="ml-4 mt-4"><b>0</b> Followers</h3>
            </div>
            <div className="mt-3 ml-2">
              <h2><b>{session?.user?.name}</b> fez {tweets.length} posts!</h2>
            </div>
          </div>
          <div className="ml-auto mt-5">
            <RefreshIcon onClick={handleRefresh} className="mr-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
          </div>
          
        </div>

        <div className="tweetsProfile">
          {tweets.map((tweet) => (
            <TweetComponent key={tweet._id} tweet={tweet}/>
          ))}
        </div>
        

    </div>
  )
}

export default Profile