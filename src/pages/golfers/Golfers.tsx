import {
  Label,
  MarqueeSelection,
  TextField,
  mergeStyleSets,
} from "@fluentui/react";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn,
  SelectionMode,
} from "@fluentui/react/lib/DetailsList";
import { IGolfer, mockGolfers } from "../../mockData/mockGolfers";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const classNames = mergeStyleSets({
  wrapper: {
    height: "100vh",
  },
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    // flexWrap: "nowrap",
  },
  headerSearchWrapper: {
    width: "500px",
    border: "none",
    flexFlow: "0",
  },
  bodyWrapper: {
    // background: "#FFFFFF",
    // overflow: "scroll",
    // width: "700px",
    flexGrow: "1",
    flexDirection: "row",
  },
  contentWrapper: {
    padding: "32px 0px 100px 0px",
    // paddingLeft: "50%",
    paddingLeft: "Calc(Calc(0.18 * Calc(100vw - 700px)) + 7vw)",
    paddingRight: "Calc(Calc(0.18 * Calc(100vw - 700px)) + 7vw)",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    flexGrow: "1",
    // verticalAlign: "middle"
  },
});

// fetch("https://jsonplaceholder.typicode.com/users")
// 	.then((response) => response.json())
// 	.then((json) => console.log(json));
// axios
//   .get("https://jsonplaceholder.typicode.com/users")
//   .then((response) => {
//     console.log("axios response", response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

export interface IGolferListState {
  items: IGolfer[];
  columns: IColumn[];
  selectionDetails: string;
  isModalSelection: boolean;
  // isModalSelection: boolean;
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

const Golfers = () => {
  // private _allItems: IGolfer[];
  // private _selection: Selection;
  // private _getKey(item: any, index?: number): string {
  //   return item.key;
  // }
  // private _onChangeText = (
  //   ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   text?: string
  // ): void => {
  //   this.setState({
  //     items: text
  //       ? this._allItems.filter(
  //           (i) =>
  //             i.firstName.toLowerCase().indexOf(text) > -1 ||
  //             i.lastName.toLowerCase().indexOf(text) > -1 ||
  //             i.handicap.toString().indexOf(text) > -1
  //         )
  //       : this._allItems,
  //   });
  // };
  // private _getSelectionDetails(): string {
  //   return "View " + this._selection.getSelection()[0];
  // }

  // private _columns: IColumn[];
  // const { MongoClient, ServerApiVersion } = require("mongodb");
  // run().then(client.connect);
  // constructor(props: {}) {
  //   super(props);

    // this._allItems = mockGolfers.sort((a, b) =>
    //   a.handicap > b.handicap ? 1 : -1
    // );

    // this._selection = new Selection({
    //   onSelectionChanged: () => {
    //     this.setState({
    //       selectionDetails: this._getSelectionDetails(),
    //       // selected: !selected,
    //     });
    //     console.log("selectionDetails", this._getSelectionDetails());
    //   },
    //   getKey: this._getKey,
    // });
    const columns: IColumn[] = [
      {
        key: "column1",
        name: "First Name",
        fieldName: "firstName",
        minWidth: 100,
        maxWidth: 200,
        isSorted: true,
        isSortedDescending: false,
        isResizable: true,
        onColumnClick: this._onColumnClick,
      },
      {
        key: "column2",
        name: "Last Name",
        fieldName: "lastName",
        minWidth: 100,
        maxWidth: 200,
        isSorted: true,
        isSortedDescending: false,
        isResizable: true,
        onColumnClick: this._onColumnClick,
      },
      {
        key: "column3",
        name: "Handicap",
        fieldName: "handicap",
        minWidth: 100,
        maxWidth: 200,
        isSorted: true,
        isSortedDescending: false,
        isResizable: true,
        onColumnClick: this._onColumnClick,
      },
    ];

    this.state = {
      items: this._allItems,
      columns,
      selectionDetails: this._getSelectionDetails(),
      isModalSelection: false,
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
          // selectionDetails: "",
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
    const { items, columns, selectionDetails } = this.state;

    console.log("this._selection", this._selection.getSelection()[0]);
    console.log("getKey", this._getKey);
    // const nav = useNavigate();

    // const handleItemInvoked = () => {
    //   // Use history to navigate to the "/" path
    //   nav("/");
    // };
    // const _handleItemInvoked = () => {
    //   const key = columnKey as keyof IGolfer;
    //   return items
    //     .slice(0)
    //     .sort((a, b) =>
    //       (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1
    //     );
    // }

    return (
      <div className={classNames.wrapper}>
        <div className={classNames.bodyWrapper}>
          <div className={classNames.contentWrapper}>
            <TextField label="Search:" onChange={this._onChangeText} />
            <br></br>
            <MarqueeSelection selection={this._selection}>
              <DetailsList
                items={items}
                columns={columns}
                selectionMode={SelectionMode.multiple}
                // getKey={this._getKey}
                setKey="multiple"
                selection={this._selection}
                // onItemInvoked={handleItemInvoked}
              />
            </MarqueeSelection>
          </div>
        </div>
      </div>
    );
  }
}
