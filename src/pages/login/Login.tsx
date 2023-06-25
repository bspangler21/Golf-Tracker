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
    paddingLeft: "400px",
    width: "100%",
  },
  fieldContainer: {
    paddingLeft: "25%",
    // flexDirection: "row",
    display: "flex",
    flexGrow: "1",
  },
});

const loginStackTokens = {
  childrenGap: 30,
};

const forgotLinkStyles = {
  color: "blue",
};

export default function Login() {
  const [username, setUsername] = useState("");

  return (
    <div className={classNames.container}>
      <div className={classNames.fieldContainer}>
        <Stack tokens={loginStackTokens}>
          <TextField
            placeholder="Username"
            required
            onChange={(e, newValue) => {
              setUsername(newValue || "");
            }}
            value={username}
          ></TextField>
          <TextField placeholder="Password" required></TextField>
          <DefaultButton
            primary={true}
            onClick={() => console.log("submitted username ", username)}
          >
            Login
          </DefaultButton>
          <Link to={`/`} className="forgot-link">
            <Label>Forgot your username or password?</Label>
          </Link>
        </Stack>
      </div>
    </div>
  );
}
