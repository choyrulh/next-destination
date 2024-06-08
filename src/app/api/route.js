import clientPromise from "../../lib/mongo/mongo";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("Wisata");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let myPost = await db.collection("Destination").insertOne(bodyObject);
      res.json(myPost.ops[0]);
      break;
    case "GET":
      const allPosts = await db.collection("Destination").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}
