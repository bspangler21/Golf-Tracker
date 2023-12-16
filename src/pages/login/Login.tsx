import {
  DefaultButton,
  Label,
  Stack,
  TextField,
  mergeStyleSets,
} from "@fluentui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
// import * as golfLogo from "../../assets/golf.png";

const classNames = mergeStyleSets({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: "100vh",
    // paddingLeft: "400px",
    // width: "100%",
    width: "100vw",
  },
  fieldContainer: {
    // paddingLeft: "25%",
    // flexDirection: "row",
    display: "flex",
    flexGrow: "1",
  },
  textBox: {
    width: "250px",
    // display: "flex",
    // flexGrow: "1",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    justifyContent: "center",
    alignItems: "center",
    // width: "250px",
    display: "flex",
    flexGrow: "1",
  },
});

const loginStackTokens = {
  childrenGap: 20,
};

// const forgotLinkStyles = {
//   color: "blue",
// };

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log("username", username);

  return (
    <div className={classNames.container}>
      <div className="column">
        <div className={classNames.fieldContainer}>
          <Stack tokens={loginStackTokens}>
            <TextField
              placeholder="Username"
              className={classNames.textBox}
              required
              onChange={(_e, newValue) => {
                setUsername(newValue || "");
              }}
              value={username}
            ></TextField>
            <TextField
              placeholder="Password"
              required
              className={classNames.textBox}
              onChange={(_e, newValue) => {
                setPassword(newValue || "");
              }}
              value={password}
            ></TextField>
            <DefaultButton
              primary={true}
              className={classNames.textBox}
              onClick={() => console.log("submitted username ", username)}
              href={`/golfers-alt`}
            >
              Login
            </DefaultButton>
            <Link to={`/`} className={classNames.label}>
              <Label>Forgot your username or password?</Label>
            </Link>
          </Stack>
        </div>
      </div>
    </div>
  );
}
