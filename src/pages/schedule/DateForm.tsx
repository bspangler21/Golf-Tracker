import {
	Form,
	Formik,
	Field,
	FormikHelpers,
	useField,
	useFormikContext,
} from "formik";
import { DatePicker, mergeStyleSets } from "@fluentui/react";
import { LeagueDate } from "../../types/LeagueDate";

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
	leagueDate: LeagueDate;
	submitted: (leagueDate: LeagueDate) => void;
};

const DatePickerField = ({ name, ...props }) => {
	const { setFieldValue } = useFormikContext();
	const [field] = useField({ name, ...props });
	return (
		<DatePicker
			{...field}
			{...props}
			onSelectDate={(date) => {
				if (date) {
					setFieldValue(field.name, new Date(date).toDateString());
				}
			}}
		/>
	);
};

const DateForm = ({ leagueDate, submitted }: Args) => {
	// const [golferState, setGolferState] = useState({ ...leagueDate });
	const initialValues = {
		leagueId: leagueDate.leagueId,
		matchDate: leagueDate.matchDate,
		matchWeekNumber: leagueDate.matchWeekNumber,
	};

	return (
		<div>
			<Formik
				initialValues={initialValues}
				onSubmit={(
					values: LeagueDate,
					{ setSubmitting }: FormikHelpers<LeagueDate>
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
						<label htmlFor="matchDate">Date</label>
						<DatePickerField
							id="matchDate"
							name="matchDate"
							placeholder="Select a date..."
							required={true}
							value={leagueDate.matchDate}
						/>
						<br></br>
						<br></br>
						<button type="submit">Submit</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

export default DateForm;
