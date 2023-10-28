import { all } from "axios";
import reactLogo from "../../assets/react.svg";
import { IGolfer, mockGolfers } from "../../mockData/mockGolfers";
import "./GolferDetail.css";
import { Link, useParams } from "react-router-dom";
import { get } from "http";
import { mergeStyleSets } from "@fluentui/react";

const allGolfers = mockGolfers;

const classNames = mergeStyleSets({
  mainBlock: {
    display: "block",
  },
  headerText: {
    // color: "#000000",
    // backgroundColor: "RGBA(0,0,0,0)",
  },
});

function getGolferById(id: number): IGolfer {
  let golferDetail: IGolfer = {} as IGolfer;

  allGolfers.forEach((g) => {
    if (g.id === id) {
      (golferDetail.id = g.id),
        (golferDetail.firstName = g.firstName),
        (golferDetail.lastName = g.lastName),
        (golferDetail.handicap = g.handicap);
    }
  });
  return golferDetail;
}

const GolferDetail = () => {
  const { id } = useParams();
  if (!id) throw Error("Golfer id not found");

  const golferId = parseInt(id);
  const golferData = getGolferById(golferId);

  console.log(golferId);
  console.log("golferData", golferData);

  return (
    <>
      <div className={classNames.mainBlock}>
        <img src={reactLogo} alt="" className="GolferImage"></img>
        <h1 className={classNames.headerText}>
          {golferData.firstName} {golferData.lastName}
        </h1>
      </div>
    </>
  );
};

export default GolferDetail;
