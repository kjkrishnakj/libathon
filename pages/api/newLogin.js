import { MongoClient } from "mongodb";
import * as faceapi from "face-api.js";

export default async function handler(req, res) {
  

  if (req.method === "POST") {
    const { faceDescriptor } = req.body;

    const client = await MongoClient.connect("mongodb+srv://krishsah5216:123@cluster0.s5x8w.mongodb.net/");
    const db = client.db();
    const usersCollection = db.collection("users");

    const users = await usersCollection.find().toArray();
    let authenticatedUser = null;

    for (const user of users) {
      const storedDescriptor = new Float32Array(user.faceDescriptor);
      const distance = faceapi.euclideanDistance(storedDescriptor, new Float32Array(faceDescriptor));

      if (distance < 0.5) { // Adjust threshold as needed
        authenticatedUser = user;
        break;
      }
    }

    client.close();

    if (authenticatedUser) {
      res.status(200).json({ message: "Authentication successful", username: authenticatedUser.username,sname:authenticatedUser.sname });
      console.log(authenticatedUser.username);
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}