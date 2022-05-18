import { Tweet } from "../typings";

export const fetchTweets = async (profileImg:string) => {
    const res = await fetch(`/api/getTweetsProfile?profileImg=${profileImg}`);

    const data = await res.json();

    const tweets: Tweet[] = data.tweets;

    return tweets
}