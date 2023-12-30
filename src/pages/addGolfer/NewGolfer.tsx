import { useFormik } from "formik";
import { TextField, mergeStyleSets } from "@fluentui/react";
import { Golfer } from "../../types/Golfer";
// import { useState } from "react";

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

type Args = {
	golfer: Golfer;
	submitted: (golfer: Golfer) => void;
};

const NewGolfer = ({ golfer, submitted }: Args) => {
	// const [golferState, setGolferState] = useState({ ...golfer });
	const formik = useFormik({
		initialValues: {
			firstName: golfer.firstName,
			lastName: golfer.lastName,
			handicap: golfer.handicap,
		},
		onSubmit: (values) => {
			// setGolferState(values);
			console.log("values", values);
			submitted(values);
		},
	});

	//   const handleChange: (e: React.ChangeEvent<any>) => ()  => void {
	//     console.log();
	// };

	return (
		<form
			onSubmit={formik.handleSubmit}
			className={classNames.wrapper}
			style={{ display: "flex", justifyContent: "center" }}
		>
			<div className={classNames.textField}>
				<label htmlFor="firstName">First Name</label>
				<TextField
					id="firstName"
					name="firstName"
					type="text"
					onChange={formik.handleChange}
					value={formik.values.firstName}
					placeholder=""
					required={true}
				/>
				<div>
					<label htmlFor="lastName">Last Name</label>
					<TextField
						id="lastName"
						name="lastName"
						type="text"
						onChange={formik.handleChange}
						value={formik.values.lastName}
						placeholder=""
						required={true}
					/>
				</div>
				<div>
					<label htmlFor="handicap">Handicap</label>
					<TextField
						id="handicap"
						name="handicap"
						type="handicap"
						onChange={formik.handleChange}
						value={formik.values.handicap.toString()}
						placeholder=""
						required={true}
					/>
				</div>
				<br></br>
				<br></br>
				<button type="submit">Submit</button>
			</div>
		</form>
	);
};

export default NewGolfer;
