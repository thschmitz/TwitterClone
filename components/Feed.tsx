import { RefreshIcon } from '@heroicons/react/outline'
import React, {useState} from 'react'
import TweetBox from './TweetBox'
import {Tweet} from '../typings'
import TweetComponent from "./Tweet";
import {fetchTweets} from "../utils/fetchTweets";
import toast from "react-hot-toast";
interface Props{
  tweets: Tweet[]
}

const Feed = ({tweets: tweetsProps}:Props) => {

  const [tweets, setTweets] = useState<Tweet[]>(tweetsProps)

  const handleRefresh = async function() {
    
    const refreshToast = toast.loading("Refreshing...")
    const tweets = await fetchTweets();
    setTweets(tweets)

    toast.success("Feed Updated", {
      id: refreshToast
    })
  }

  return (
    <div className="col-span-7 border-x max-h-screen scrollbar-hide overflow-scroll lg:col-span-5">
        <div className="flex item-center justify-between">
            <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
            <RefreshIcon onClick={handleRefresh} className="mt-5 mr-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
        </div>

        <div>
          <TweetBox setTweets={setTweets}/>
        </div>

        <div>
          {tweets.map((tweet) => (
            <TweetComponent key={tweet._id} tweet={tweet}/>
          ))}
        </div>
    </div>
  )
}

export default Feed