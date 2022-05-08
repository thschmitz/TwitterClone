// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {groq} from "next-sanity"
import { sanityClient } from '../../sanity';

const commentQuery = groq`
    *[_type== "comment" && references(*[_type=="tweet" && _id == "df2f1f53-f1ff-4a10-99b7-8a61b253be8e"]._id)] {
    _id,
    ...
    } | order(_createdAt desc)
`
type Data = Comment[]


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {tweetId} = req.query;
    const comments: Comment[] = await sanityClient.fetch(commentQuery, {tweetId})
    res.status(200).json(comments)
}
