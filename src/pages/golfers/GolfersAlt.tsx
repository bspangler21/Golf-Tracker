import { ReactNode } from "react";
import { mockGolfers, mockGolfersString } from "../../mockData/mockGolfers";

const golfers = mockGolfersString; // as ReactNode;

export default function GolfersAlt() {
  const golfersList = golfers ? (
    golfers.map((golfer) => <li>{golfer}</li>)
  ) : (
    <li></li>
  );
  return <ul>{golfersList}</ul>;
}
