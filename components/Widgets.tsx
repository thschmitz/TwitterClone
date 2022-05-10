import { SearchIcon } from '@heroicons/react/outline'
import React, {useState, useEffect} from 'react'
import {TwitterTimelineEmbed} from "react-twitter-embed"
import {useSession} from "next-auth/react"

const Widgets = () => {

  const [value, setValue] = useState<string>("")

  const handleChange = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault()
    setValue(document.getElementById("searchInput").value)
    console.log(value)
  }

  return (
      <div className="mt-2 px-2 col-span-2 hidden lg:inline">
        <div className="flex item-center space-x-2 bg-gray-100 p-3 rounded-full">
            <SearchIcon className="w-5 h-5"/>
            <input type="text" id="searchInput" placeholder="Search Twitter" className="flex-1 outline-none bg-transparent"/>
        </div>
        <div className="mt-2 flex flex-1 justify-center mb-2">
          <input onClick={handleChange} className="bg-twitter rounded-full  cursor-pointer text-white p-2 flex " type="submit" value="Search"/>
        </div>
        <TwitterTimelineEmbed
            sourceType="profile"
            screenName={value}
            options={{height: 1000}}
        />      

    </div>


  )
}

export default Widgets