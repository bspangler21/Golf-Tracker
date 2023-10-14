import React from "react";
import { useFormik } from "formik";
import { TextField, mergeStyleSets } from "@fluentui/react";

const classNames = mergeStyleSets({
  wrapper: {
    height: "100vh",
    display: "block",
  },
  mainContentWrapper: {
    alignItems: "center",
  },
  textField: {
    width: "200px",
    boxSizing: "border-box",
    padding: "20px",
    minWidth: "200px",
  },
});

const AddGolfer = () => {
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

  //   const handleChange: (e: React.ChangeEvent<any>) => ()  => void {
  //     console.log();
  // };

  return (
    <form onSubmit={formik.handleSubmit} className={classNames.wrapper}>
      <div className={classNames.textField}>
        <label htmlFor="firstName">First Name</label>
        <TextField
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          placeholder="Brett"
        />
        <div>
          <label htmlFor="lastName">Last Name</label>
          <TextField
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            placeholder="Spangler"
          />
        </div>
        <div>
          <label htmlFor="handicap">handicap Address</label>
          <TextField
            id="handicap"
            name="handicap"
            type="handicap"
            onChange={formik.handleChange}
            value={formik.values.handicap}
            placeholder="0"
          />
        </div>
        <br></br>
        <br></br>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddGolfer;
