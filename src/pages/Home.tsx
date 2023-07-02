import {
  DefaultButton,
  IStackTokens,
  Stack,
  StackItem,
  Text,
  mergeStyleSets,
} from "@fluentui/react";
import "./Home.css";
// import { useNavigate } from "react-router-dom";

// const nav = useNavigate();
const classNames = mergeStyleSets({
  buttonContainer: {
    display: "flex",
    flexGrow: "1",
    paddingLeft: "36%",
  },
  button: {
    width: "200px",
  },
});

const stackStyles: IStackTokens = {
  childrenGap: 20,
};

export default function Home() {
  return (
    <div className="container">
      <div className="column">
        <h1 className="Header">Welcome to the Golf Tracker!</h1>
        {/* <Stack horizontal styles={stackStyles} */}
        <div className={classNames.buttonContainer}>
          <Stack tokens={stackStyles}>
            <Stack.Item>
              <DefaultButton primary={true} href={`/`}>
                Back
              </DefaultButton>
            </Stack.Item>
            <Stack.Item>
              <DefaultButton href={`/login`} className={classNames.button}>
                Login
              </DefaultButton>
            </Stack.Item>
            <Stack.Item>
              <DefaultButton href={`/golfers`} className={classNames.button}>
                View Golfers
              </DefaultButton>
            </Stack.Item>
          </Stack>
        </div>
      </div>
    </div>
  );
}
