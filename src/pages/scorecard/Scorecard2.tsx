import { Label, TextField } from "@fluentui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { mockHoles } from "../../mockData/mockHoles";
import { mockGolfers } from "../../mockData/mockGolfers";

const golfHoles = mockHoles;
const golfers = mockGolfers;

interface Hole {
  holeNumber: number;
  par: number;
}

interface Player {
  name: string;
  scores: number[];
}

interface ScorecardProps {
  courseName: string;
  holes: Hole[];
  players: Player[];
}

const Scorecard2 = ({ courseName, players }) => {
  const [scores, setScores] = useState(
    mockGolfers.map(() => Array(golfHoles.length).fill(0))
  );
  function handleScoreChange(
    e: ChangeEvent<HTMLInputElement>,
    index: any,
    holeIndex: any
  ): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <h1>{courseName}</h1>
      <table>
        <thead>
          <tr>
            <th>Hole</th>
            {golfHoles.map((hole) => (
              <th key={hole.holeNumber}>H{hole.holeNumber}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {golfers.map((player, index) => (
            <tr key={player.id}>
              <td>
                {player.firstName}
                {player.lastName}
              </td>
              {player.scores &&
                player.scores.map((score, holeIndex) => (
                  <td key={holeIndex}>
                    <input
                      type="number"
                      value={scores[index][holeIndex]}
                      onChange={(e) => handleScoreChange(e, index, holeIndex)}
                    />
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Calculate and display totals */}
    </div>
  );
};

export default Scorecard2;
