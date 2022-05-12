import React, {useEffect, useState, MouseEvent} from 'react'
import {Comment, Tweet, CommentBody, TweetBody} from '../typings'
import TimeAgo from "react-timeago"
import {
    ChatAlt2Icon,
    HeartIcon,
    SwitchHorizontalIcon,
    UploadIcon,
} from "@heroicons/react/outline"
import {fetchComments} from "../utils/fetchComments"
import {useSession} from "next-auth/react"
import toast from 'react-hot-toast'
import Api from "../Api"

interface Props {
    tweet: Tweet
}

const style = {
    height: `h-5 w-5`,
    properties: `flex cursor-pointer items-center space-x-3 text-gray-400`,
    propertiesLikes: `flex cursor-pointer items-center space-x-3 text-red-400`,
}

const Tweet = ({tweet}: Props) => {

    const [comments, setComments] = useState<Comment[]>([])
    const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
    const [input, setInput] = useState<string>("")
    const {data:session} = useSession()
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState()

    const refreshComment = async () => {
        const comments: Comment[] = await fetchComments(tweet._id);
        setComments(comments)
    }

    useEffect(() => {
        refreshComment()
        Api.getLikes(tweet._id, setLikes)
    }, [])

    const postComment = async () => {
        const commentInfo: CommentBody = {
            comment: input,
            profileImg: session?.user?.image || "Unknows User",
            username: session?.user?.name || "https://links.papareact.com/gll",
            tweetId: tweet._id
        }

        console.log(tweet._id)

        const result = await fetch("/api/addComment", {
            body: JSON.stringify(commentInfo),
            method: "POST",
        })

        const json = await result.json();

        toast.success("Comment Posted")
        return json
    }
    

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(!input) return;
        e.preventDefault();

        postComment();

        setInput("")
        setCommentBoxVisible(false)
        

    }

    const deslike = () => {
        setLiked(false)

        Api.removeLikes(tweet._id, session.user.name)
        Api.getLikes(tweet._id, setLikes)
        toast.success("Desliked")
    }

    const like = async () => {
        setLiked(true)

        Api.addLikes(tweet._id, session.user.name)
        Api.getLikes(tweet._id, setLikes)
        toast.success("Liked!")
    }


    console.log(comments)

    return (
        <div className="flex flex-col space-x-3 border-y p-5 border-gray-100">
            <div className="flex space-x-3">
                <img className="h-10 w-10 rounded-full object-cover" src={tweet.profileImg} alt=""/>
                <div>
                    <div className="flex items-center space-x-1">
                        <p className="mr-1 font-bold">{tweet.username}</p>
                        <p className="hidden text-sm text-gray-500 sm:inline">@{tweet.username.replace(/\s+/g, "").toLocaleLowerCase()} • </p>

                        <TimeAgo date={tweet._createdAt} className="text-sm text-gray-500"/>
                    </div>

                    <p className="pt-1">{tweet.text}</p>
                    {tweet.image && (
                        <img className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm" src={tweet.image} alt=""/>
                    )}
                </div>
            </div>

            <div className="mt-5 flex justify-between">
                <div className={style.properties}>
                    <ChatAlt2Icon onClick={() => setCommentBoxVisible(!commentBoxVisible)} className={style.height}/>
                    <p>{comments.length}</p>
                </div>
                <div className={style.properties}>
                    <SwitchHorizontalIcon className={style.height}/>
                </div>
                <div className={liked? style.propertiesLikes : style.properties}>
                    <HeartIcon onClick={() => liked? deslike() : like()} className={style.height}/>
                    <p>{likes}</p>
                </div>
                <div className={style.properties}>
                    <UploadIcon className={style.height}/>
                </div>
            </div>

            {commentBoxVisible && (
                <form onSubmit={handleSubmit} className="mt-3 flex space-x-3">
                    <input value={input} onChange={e => setInput(e.target.value)}className="rounded-lg flex-1 bg-gray-100 p-2 outline-none" type="text" placeholder="Write a comment..." />
                    <button disabled={!input} type="submit" className="text-twitter disabled:text-gray-200">Post</button>
                </form>
            )}

            {comments?.length > 0 && (
                <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
                    {comments.map(comment => (
                        <div key={comment._id} className="relative flex space-x-2">
                            <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30"/>
                            <img src={comment.profileImg} alt="" className="mt-2 h-7 w-7 rounded-full object-cover"/>
                            <div>
                                <div className="flex items-center space-x-1">
                                    <p className="mr-1 font-bold">{comment.username}</p>
                                    <p className="hidden text-sm text-gray-500 lg:inline">@{comment.username.replace(/\s+/g, "").toLocaleLowerCase()} • </p>
                                    <TimeAgo date={comment._createdAt} className="text-sm text-gray-500"/>
                                </div>
                                <p>{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
  )
}

export default Tweet