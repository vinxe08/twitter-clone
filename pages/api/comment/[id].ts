import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req: NextApiRequest,
  res: NextApiResponse) {
  const { method, query: { id } } = req;
  // const { id } = req.query

  const { db } = await connectToDatabase();

  if(method === "GET") {

    try {
      const posts = await db.collection("posts").find({_id: new ObjectId(id.toString())}).sort({timestamp: -1}).toArray();
      res.status(200).json(posts)
    } catch(error) {
      res.status(500).json(error)
    }
  }
}