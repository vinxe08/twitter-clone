import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../.././util/mongodb";

export default async function handler(req: NextApiRequest,
  res: NextApiResponse) {
  const { method, body } = req;

  const { db } = await connectToDatabase();

  if(method === "POST") {
    try {
      await db
        .collection("posts")
        .updateOne({_id: new ObjectId(body.id)},{$push:{"likes":body.likes}} )
    } catch(error) {
       res.json(error)
    }
  }

  if(method === 'DELETE'){
    try {
      await db
      .collection("posts")
      .updateOne({_id: new ObjectId(body.id)},{$pull:{"likes":body.user}} )
    } catch(error) {
      res.json(error)
    }
  }

}