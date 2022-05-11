import { Tweet } from "../typings";

export const fetchLikes = async (tweetId:string) => {
    const res = await fetch(`/api/getLikes?tweetId=${tweetId}`);

    const data = await res.json();

    const tweets: Tweet[] = data.tweets;
    console.log("PostLiked: ", tweetId)
    return tweets
}