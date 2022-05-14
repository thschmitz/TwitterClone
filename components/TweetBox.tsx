import React, {useState, useRef, SetStateAction, Dispatch, MouseEvent} from 'react'
import {CalendarIcon, EmojiHappyIcon, LocationMarkerIcon, PhotographIcon, SearchCircleIcon} from '@heroicons/react/outline'
import {useSession} from "next-auth/react"
import { TweetBody, Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'
import Link from "next/link"

const style= {
  iconAnimation: `h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150`
}

interface Props{
  setTweets: Dispatch<SetStateAction<Tweet[]>>
}

const TweetBox = ({setTweets}: Props) => {
  const [input, setInput] = useState<string>("")
  const imageInputRef = useRef<HTMLInputElement>(null)
  const {data: session} = useSession()
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)
  const [image, setImage] = useState<string>("")

  const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    if(!imageInputRef.current?.value) return;

    setImage(imageInputRef.current.value)
    imageInputRef.current.value=""
    setImageUrlBoxIsOpen(false)
  }

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      image: image,
      profileImg: session?.user?.image || "Unknows User",
      username: session?.user?.name || "https://links.papareact.com/gll",
      likes: 0,
    }

    const result = await fetch("/api/addTweet", {
      body: JSON.stringify(tweetInfo),
      method: "POST",

    })

    const json = await result.json();

    const newTweets = await fetchTweets();
    setTweets(newTweets)

    toast.success("Tweet Posted")
    return json
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    if(!input) return;

    postTweet();

    setInput("")
    setImage("")
    setImageUrlBoxIsOpen(false)
  }

  return (
    <div className="flex space-x-2 p-5">
        <Link href="/profile" ><img className="cursor-pointer h-14 w-14 object-cover rounded-full mt-4" src={session?.user?.image || "https://links.papareact.com/gll"} alt="" /></Link>
        <div className="flex flex-1 items-center pl-2">
          <form className="flex flex-1 flex-col">
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="What's happening?" className="h-24 w-full text-xl outline-none placeholder:text-xl"/>
            <div className="flex items-center text-twitter">
              <div className="flex space-x-2 text-twitter flex-1">
                <PhotographIcon onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)} className={style.iconAnimation} />
                <SearchCircleIcon className={style.iconAnimation}/>
                <EmojiHappyIcon className={style.iconAnimation}/>
                <CalendarIcon className={style.iconAnimation}/>
                <LocationMarkerIcon className={style.iconAnimation}/>
              </div>
              <button onClick={handleSubmit} disabled={!input || !session} className="bg-twitter rounded-full px-5 py-2 font-bold text-white cursor-pointer disabled:opacity-40" type="submit">Tweet</button>
            </div>

            {imageUrlBoxIsOpen && (
              <form className="mt-5 rounded-lg flex bg-twitter/80 py-2 px-4">
                <input ref={imageInputRef} className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white" type="text" placeholder="Enter Image URL..."/>
                <button onClick={addImageToTweet} className="font-bold text-white">Add Image</button>
              </form>
            )}

            {image && (
              <img className="mt-10 h-40 w-full rounded-full object-contain shadow-lg" src={image}/>
            )}
          </form>
        </div>
    </div>
  )
}

export default TweetBox