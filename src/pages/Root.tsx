import { Outlet } from "react-router";
import Header from "../pageComponents/Header";

const Root = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default Root;