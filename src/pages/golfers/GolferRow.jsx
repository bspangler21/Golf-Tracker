const GolferRow = ({ golfer }) => {
	return (
		<tr>
			<td>{golfer.firstName}</td>
			<td>{golfer.lastName}</td>
			<td>{golfer.handicap}</td>
		</tr>
	);
};

export default GolferRow;
