// import { ReactNode, useState } from "react";
import { mockGolfers } from "../../mockData/mockGolfers";
import Table from "react-bootstrap/Table";
import utilStyles from "../../styles/utilStyles.module.css";
import { useNavigate } from "react-router-dom";

const golfers = mockGolfers;

const Golfers = () => {
  const nav = useNavigate();

  return (
    <div className={utilStyles.container}>
      <Table
        bordered
        // hover
        responsive
        striped="columns"
        // variant="dark"
        size="lg"
      >
        <thead>
          <tr className={utilStyles.tableHeader}>
            <th>Handicap</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {golfers.map((g) => (
            <>
              <tr
                key={g.id}
                onClick={() => nav(`/golfer-detail/${g.id}`)}
                className={utilStyles.tableBody}
              >
                <td>{g.handicap}</td>
                <td>{g.firstName}</td>
                <td>{g.lastName}</td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Golfers;
