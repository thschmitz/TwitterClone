import React from 'react'
import {useSession} from "next-auth/react"


const Profile = () => {

    const {data: session} = useSession()
    console.log(session)
  return (
    <div className="col-span-7 border-x max-h-screen scrollbar-hide overflow-scroll lg:col-span-5">
        <div className="flex item-center justify-between">
            <h1 className="p-5 pb-0 text-xl font-bold">Profile</h1>
        </div>
        <div className="bg-twitter h-40 mt-5"></div>
        <img src={session?.user?.image || "https://links.papareact.com/gll"} alt="" className="rounded-full -mt-5 w-20 h-20" />
    </div>
  )
}

export default Profile