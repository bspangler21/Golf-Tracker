import { useFormik, Form, Formik, Field, FormikHelpers } from "formik";
import { TextField, mergeStyleSets } from "@fluentui/react";
import { Golfer } from "../../types/Golfer";
import { useState } from "react";
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

const GolferForm = ({ golfer, submitted }: Args) => {
	// const [golferState, setGolferState] = useState({ ...golfer });
	const initialValues = {
		firstName: golfer.firstName,
		lastName: golfer.lastName,
		handicap: golfer.handicap,
		id: golfer.id,
	};
	// const formik = useFormik({
	// 	initialValues: {
	// 		firstName: golfer.firstName,
	// 		lastName: golfer.lastName,
	// 		handicap: golfer.handicap,
	// 		id: golfer.id,
	// 	},
	// 	onSubmit: (values) => {
	// 		setGolferState(values);
	// 		setGolferState({
	// 			...golferState,
	// 			id: golfer.id,
	// 			handicap: values.handicap,
	// 			firstName: values.firstName,
	// 			lastName: values.lastName,
	// 		});
	// 		console.log("values", values);
	// 		console.log("golferState", golferState);
	// 		submitted(golferState);
	// 	},
	// });

	//   const handleChange: (e: React.ChangeEvent<any>) => ()  => void {
	//     console.log();
	// };

	return (
		<div>
			<Formik
				initialValues={initialValues}
				onSubmit={(
					values: Golfer,
					{ setSubmitting }: FormikHelpers<Golfer>
				) => {
					console.log({ values });
					// alert(JSON.stringify(values, null, 2));
					submitted(values);
					setSubmitting(false);
				}}
			>
				<Form
					// onSubmit={formik.handleSubmit}
					className={classNames.wrapper}
					style={{ display: "flex", justifyContent: "center" }}
				>
					<div className={classNames.textField}>
						<label htmlFor="firstName">First Name</label>
						<Field
							id="firstName"
							name="firstName"
							type="text"
							// onChange={formik.handleChange}
							// value={formik.values.firstName}
							placeholder=""
							required={true}
						/>
						<div>
							<label htmlFor="lastName">Last Name</label>
							<Field
								id="lastName"
								name="lastName"
								type="text"
								// onChange={formik.handleChange}
								// value={formik.values.lastName}
								placeholder=""
								required={true}
							/>
						</div>
						<div>
							<label htmlFor="handicap">Handicap</label>
							<Field
								id="handicap"
								name="handicap"
								type="handicap"
								// onChange={formik.handleChange}
								// value={formik.values.handicap.toString()}
								placeholder=""
								required={true}
							/>
						</div>
						<br></br>
						<br></br>
						<button type="submit">Submit</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

export default GolferForm;
