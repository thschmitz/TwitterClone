import React, {useState} from 'react'
import {CalendarIcon, EmojiHappyIcon, LocationMarkerIcon, PhotographIcon, SearchCircleIcon} from '@heroicons/react/outline'

const style= {
  iconAnimation: `h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150`
}

const TweetBox = () => {
  const [input, setInput] = useState<string>("")

  return (
    <div className="flex space-x-2 p-5">
        <img className="h-14 w-14 object-cover rounded-full mt-4" src="https://links.papareact.com/gll" alt="" />
        <div className="flex flex-1 items-center pl-2">
          <form className="flex flex-1 flex-col">
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="What's happening?" className="h-24 w-full text-xl outline-none placeholder:text-xl"/>
            <div className="flex items-center text-twitter">
              <div className="flex space-x-2 text-twitter flex-1">
                <PhotographIcon className={style.iconAnimation} />
                <SearchCircleIcon className={style.iconAnimation}/>
                <EmojiHappyIcon className={style.iconAnimation}/>
                <CalendarIcon className={style.iconAnimation}/>
                <LocationMarkerIcon className={style.iconAnimation}/>
              </div>
              <button disabled={!input} className="bg-twitter rounded-full px-5 py-2 font-bold text-white cursor-pointer disabled: opacity-40" type="submit">Tweet</button>
            </div>

          </form>
        </div>
    </div>
  )
}

export default TweetBox