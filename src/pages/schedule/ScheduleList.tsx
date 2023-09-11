import { mergeStyleSets } from "@fluentui/react";
import { mockDates } from "../../mockData/mockDates";

const mockDatesList = mockDates;
console.log("mockDatesList", mockDatesList);

const classNames = mergeStyleSets({
  tableTextColor: {
    color: "#000000",
    width: "100vh",
    height: "100vh",
  },
  tableHeader: {
    width: "50%",
    border: "2px #000000",
    verticalAlign: "middle",
    // display: "flex",
    // flexDirection: "row",

    flexGrow: "1",
  },
  tableRow: {
    // display: "flex",
    flexDirection: "column",
    borderBottom: "1px #000000",
    verticalAlign: "middle",
  },
});

export default function ScheduleList() {
  const scheduleListValues = mockDatesList ? (
    mockDatesList.map((mockDate) => (
      <tr key={mockDate.matchDate.getTime()} className={classNames.tableRow}>
        <td>{mockDate.matchWeekNumber}</td>
        <td>{mockDate.matchDate.toLocaleDateString()}</td>
      </tr>
    ))
  ) : (
    <tr className={classNames.tableRow}>
      <td></td>
      <td></td>
    </tr>
  );

  return (
    <div className={classNames.tableTextColor}>
      <table>
        <thead className={classNames.tableHeader}>
          <tr>
            <th>Match Number</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{scheduleListValues}</tbody>
      </table>
    </div>
  );
}
