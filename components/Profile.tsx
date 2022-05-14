import React, {useState} from 'react'
import {useSession} from "next-auth/react"
import {fetchTweets} from "../utils/fetchTweets";

const Profile = async () => {
  const {data: session} = useSession()
  const [tweetsProfile, setTweetsProfile] = useState<Tweet[]>([])

  const tweets = await fetchTweets();
  setTweetsProfile(tweets)


  return (
    <div className="col-span-7 border-x max-h-screen scrollbar-hide overflow-scroll lg:col-span-5">
        <div className="flex item-center justify-between">
            <h1 className="p-5 pb-0 text-xl font-bold">Profile</h1>
        </div>
        <div className="bg-twitter h-40 mt-5"></div>
        <div className="informacoes">
          <div className="">
            <img src={session?.user?.image || "https://links.papareact.com/gll"} alt="" className="ml-10 w-20 h-20 rounded-full -mt-10"/>
          </div>
          <div className="name">
            <h1 className="text-lg ml-2">{session?.user?.name}</h1>
            <h1 className="text-sm ml-2">@{session?.user?.name?.replace(/\s+/g, "").toLocaleLowerCase()}</h1>
          </div>
          <div className="login">
            <h1 className="text-sm ml-2 mt-4">Ultima vez logado</h1>
          </div>
          <div className="flex">
            <h1 className="text-sm ml-2 mt-4"><b>1</b> Following</h1>
            <h1 className="text-sm ml-4 mt-4"><b>0</b> Followers</h1>
          </div>
          <div className="tweetsProfile">

          </div>
        </div>

    </div>
  )
}

export default Profile