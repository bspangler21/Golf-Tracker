import { createTheme } from "@mui/material";

export const theme = createTheme({
	components: {
		// Name of the component
		MuiButton: {
			styleOverrides: {
				// Name of the slot
				root: {
					// Some CSS
					fontSize: "1rem",
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: "#000000",
				},
			},
		},
	},
});
