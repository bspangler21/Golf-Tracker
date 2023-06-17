import { Label } from "@fluentui/react";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn,
} from "@fluentui/react/lib/DetailsList";
import { IGolfer, mockGolfers } from "../../mockData/mockGolfers";
import React from "react";

export interface IGolferListState {
  items: IGolfer[];
}
// import { MongoClient, ServerApiVersion } from "mongodb";

// const uri =
//   "mongodb+srv://bspangler21:CM2xP2C2Ul5jLf7l@spangdev.xsqup9m.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

// client.connect();

// async function run() {
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

//   try {
//     const database = client.db("golf-tracker");
//     const golfers = database.collection("golfers");
//     // Query for a movie that has the title 'Back to the Future'
//     const query = { "First Name": "Brett" };
//     const golfer = await golfers.findOne(query);
//     console.log(golfer);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

export default class Schedule extends React.Component<{}, IGolferListState> {
  private _allItems: IGolfer[];
  private _columns: IColumn[];
  // const { MongoClient, ServerApiVersion } = require("mongodb");
  // run().then(client.connect);
  constructor(props: {}) {
    super(props);

    this._allItems = mockGolfers;
    this._columns = [
      {
        key: "column1",
        name: "First Name",
        fieldName: "firstName",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
      },
      {
        key: "column2",
        name: "Last Name",
        fieldName: "lastName",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
      },
      {
        key: "column3",
        name: "Handicap",
        fieldName: "handicap",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
      },
    ];

    this.state = {
      items: this._allItems,
    };
  }

  public render(): JSX.Element {
    const { items } = this.state;

    return (
      <div>
        <DetailsList items={items} columns={this._columns} />{" "}
      </div>
    );
  }
}
