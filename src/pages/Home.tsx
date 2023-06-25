import {
  DefaultButton,
  IStackTokens,
  Stack,
  StackItem,
  Text,
} from "@fluentui/react";
import "./Home.css";
// import { useNavigate } from "react-router-dom";

// const nav = useNavigate();


const stackStyles: IStackTokens = {
  childrenGap: 20,
};

export default function Home() {
  return (
    <div className="container">
      <div className="column">
        <h1 className="Header">Welcome to the Golf Tracker!</h1>
        {/* <Stack horizontal styles={stackStyles} */}
        <div className="button-container">
          <Stack horizontal tokens={stackStyles}>
            <Stack.Item>
              <DefaultButton primary={true} href={`/`}>
                Back
              </DefaultButton>
            </Stack.Item>
            <Stack.Item>
              <DefaultButton href={`/login`}>Login</DefaultButton>
            </Stack.Item>
            <Stack.Item>
              <DefaultButton href={`/golfers`}>View Golfers</DefaultButton>
            </Stack.Item>
          </Stack>
        </div>
      </div>
    </div>
  );
}
