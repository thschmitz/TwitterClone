import { Tweet } from "../typings";

export const fetchTweets = async (name:string) => {
    const res = await fetch(`/api/getTweetsProfile?name=${name}`);

    const data = await res.json();

    const tweets: Tweet[] = data.tweets;

    return tweets
}