import { Tweet } from "../typings";

export const fetchLikes = async (tweetId:string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getLikestweetId=${tweetId}`);

    const data = await res.json();

    const tweets: Tweet[] = data.tweets;
    console.log("PostLiked: ", tweets)
    return tweets
}
/*
import { Tweet } from "../typings";

export const fetchLikes = async (tweetId:string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getLikes`);

    console.log("res: ", res)
}*/