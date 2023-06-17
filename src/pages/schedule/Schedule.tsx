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
  columns: IColumn[];
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

export default class Golfers extends React.Component<{}, IGolferListState> {
  private _allItems: IGolfer[];
  // private _columns: IColumn[];
  // const { MongoClient, ServerApiVersion } = require("mongodb");
  // run().then(client.connect);
  constructor(props: {}) {
    super(props);

    this._allItems = mockGolfers.sort((a, b) =>
      a.handicap > b.handicap ? 1 : -1
    );
    const columns: IColumn[] = [
      {
        key: "column1",
        name: "First Name",
        fieldName: "firstName",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        onColumnClick: this._onColumnClick,
      },
      {
        key: "column2",
        name: "Last Name",
        fieldName: "lastName",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        onColumnClick: this._onColumnClick,
      },
      {
        key: "column3",
        name: "Handicap",
        fieldName: "handicap",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        onColumnClick: this._onColumnClick,
      },
    ];

    this.state = {
      items: this._allItems,
      columns,
    };
  }

  private _onColumnClick = (
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): void => {
    const { columns, items } = this.state;
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter(
      (currCol) => column.key === currCol.key
    )[0];

    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        const newItems = _copyAndSort(
          items,
          currColumn.fieldName!,
          currColumn.isSortedDescending
        );
        this.setState({
          columns: newColumns,
          items: newItems,
        });
      }
    });

    function _copyAndSort<IGolfer>(
      items: IGolfer[],
      columnKey: string,
      isSortedDescending?: boolean
    ): IGolfer[] {
      const key = columnKey as keyof IGolfer;
      return items
        .slice(0)
        .sort((a, b) =>
          (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1
        );
    }
  };

  public render() {
    const { items, columns } = this.state;

    return (
      <div>
        <DetailsList items={items} columns={columns} />
      </div>
    );
  }
}
