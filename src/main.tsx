import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";
import { initializeIcons } from "@fluentui/font-icons-mdl2";

initializeIcons();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	//{/* </React.StrictMode> */}
);
