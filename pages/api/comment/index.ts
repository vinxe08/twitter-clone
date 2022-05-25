import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req: NextApiRequest,
  res: NextApiResponse) {
  const { method, body } = req;

  const { db } = await connectToDatabase();

  if(method === "POST") {
    try {
      const post = await db
        .collection("posts")
        .updateOne({_id: new ObjectId(body.id)},{$push:{"comments":{...body}} });
      res.status(201).json(post)
    } catch(error) {
        res.status(500).json(error)
    }
  }
}