import type { NextApiRequest, NextApiResponse } from 'next'
import {TweetBody} from "../../typings"

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const data: TweetBody = JSON.parse(req.body)
    console.log("data: ", data)
    const mutations = {
        mutations: [
            {
                update:{
                    _type: "tweet",
                    likes: data.likes,
                }
            }
        ]
    }

    const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`

    const result = await fetch(apiEndpoint, {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
        },
        body:JSON.stringify(mutations),
        method: 'PATCH'
    })

    const json = await result.json();
    res.status(200).json({ message: 'Added' })
}
