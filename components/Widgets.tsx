import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import {TwitterTimelineEmbed} from "react-twitter-embed"

const Widgets = () => {
  return (
      <div className="mt-2 px-2">
        <div className="flex item-center space-x-2 bg-gray-100 p-3 rounded-full">
            <SearchIcon className="w-5 h-5"/>
            <input type="text" placeholder="Search Twitter" className="flex-1 outline-none bg-transparent"/>
        </div>
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="sonnysangha"
                options={{height: 400}}
            />      
        </div>


  )
}

export default Widgets