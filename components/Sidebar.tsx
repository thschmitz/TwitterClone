import React from 'react'
import{
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    CollectionIcon,
    DotsCircleHorizontalIcon,
    MailIcon,
    UserIcon,
    HomeIcon,
} from '@heroicons/react/outline'
import SidebarRow from './SidebarRow'
import {signOut, signIn, useSession} from "next-auth/react"

const Sidebar = () => {

  const {data:session} = useSession();


  return (
    <div className="m-3 flex flex-col col-span-2 items-center px-4 md:items-start">
        <img className="h-9 w-9 mb-5" src="https://links.papareact.com/drq" alt="" />
        <SidebarRow Icon={HomeIcon} title="Home" />
        <SidebarRow Icon={HashtagIcon} title="Explore" />
        <SidebarRow Icon={BellIcon} title="Notifications" />
        <SidebarRow Icon={MailIcon} title="Messages" />
        <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
        <SidebarRow Icon={CollectionIcon} title="Lists" />
        <SidebarRow onClick={session ? signOut : signIn} Icon={UserIcon} title={session? "Sign out" : "Sign in"} />
        <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
    </div>
  )
}

export default Sidebar