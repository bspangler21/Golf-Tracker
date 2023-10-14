import { mergeStyleSets } from "@fluentui/react";
import { Formik, FormikHelpers, Field, Form, useFormik } from "formik";
import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

const formik = useFormik({
  initialValues: {
    firstName: "",
    lastName: "",
    handicap: "",
  },
  onSubmit: (values) => {
    alert(JSON.stringify(values, null, 2));
  },
});

const classNames = mergeStyleSets({
  wrapper: {
    height: "100vh",
    display: "block",
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
  mainContentWrapper: {
    alignItems: "center",
  },
  textField: {
    width: "200px",
    // width: "100%",
    boxSizing: "border-box",
    // padding: "10px",
  },
});

const AddGolfer = () => {
  const [golferFirstName, setGolferFirstName] = useState("");

  // private _onChangeText = (
  //   ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   text?: string
  // ): void => this.setState({
  //   golferFistName: text
  // });

  handleChange: (e: React.ChangeEvent<any>) =>
    void (
      {
        // setGolferFirstName(formik.values.firstName);
      }
    );

  // console.log("golferFirstName", golferFirstName);

  console.log("golferFirstName", formik.va);

  return (
    <div className={classNames.wrapper}>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          handicap: 0,
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form className={classNames.mainContentWrapper}>
          <div className={classNames.textField}>
            <label htmlFor="firstName">First Name</label>
            <Field
              id="firstName"
              name="firstName"
              placeholder="John"
              // onChange={(e, newValue) => {
              //   setGolferFirstName(newValue || "");
              // }}
              // value={golferFirstName}
              value={formik.values.firstName}
            />
          </div>
          <div className={classNames.textField}>
            <label htmlFor="lastName">Last Name</label>
            <Field id="lastName" name="lastName" placeholder="Doe" />
          </div>
          <div className={classNames.textField}>
            <label htmlFor="handicap">Handicap</label>
            <Field
              id="handicap"
              name="handicap"
              placeholder=""
              type="handicap"
            />
          </div>
          <br></br>
          <br></br>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddGolfer;
// ReactDOM.render(<AddGolfer />, document.getElementById("root"));
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<AddGolfer />);
