// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {groq} from "next-sanity"
import { sanityClient } from '../../sanity';
import {Tweet} from "../../typings"

const tweetQuery = groq`
    *[_type== "tweet" && _id == $tweetId] {
        _id,
        likes,
        ...
    }
`
type Data = Tweet[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {tweetId} = req.query;
    const tweets: Tweet[] = await sanityClient.fetch(tweetQuery, {tweetId})
    console.log("Teste:", tweets)
    res.status(200).json(tweets)
}