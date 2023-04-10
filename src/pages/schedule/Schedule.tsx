import { Label } from "@fluentui/react";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://bspangler21:CM2xP2C2Ul5jLf7l@spangdev.xsqup9m.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// client.connect();

async function run() {
  //   try {
  //     await client.connect();
  //     // Send a ping to confirm a successful connection
  //     await client.db("admin").command({ ping: 1 });
  //     console.log(
  //       "Pinged your deployment. You successfully connected to MongoDB!"
  //     );
  //   } finally {
  //     // Ensures that the client will close when you finish/error
  //     await client.close();
  //   }
  // }
  // run().catch(console.dir);

  try {
    const database = client.db("golf-tracker");
    const golfers = database.collection("golfers");
    // Query for a movie that has the title 'Back to the Future'
    const query = { "First Name": "Brett" };
    const golfer = await golfers.findOne(query);
    console.log(golfer);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export default function Schedule() {
  // const { MongoClient, ServerApiVersion } = require("mongodb");
  run().then(client.connect);
  return <Label>Forgot your username or password?</Label>;
}
