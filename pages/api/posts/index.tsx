import { Timestamp } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req: NextApiRequest,
  res: NextApiResponse) {
  const { method, body } = req;

  const { db } = await connectToDatabase();

  // RETRIEVING DATA from Database(MongoDB)
  if(method === "GET") {
    try {
      const posts = await db.collection("posts").find().sort({timestamp: -1}).toArray();
      res.status(200).json(posts)
    } catch(error) {
      res.status(500).json(error)
    }
  }

  // SENDING DATA to Database(MongoDB)
  if(method === "POST") {
    try {
      const post = await db
        .collection("posts")
        .insertOne({...body, timestamp: Date.now() });
      res.status(201).json(post)
    } catch(error) {
        res.status(500).json(error)
    }
  }
}