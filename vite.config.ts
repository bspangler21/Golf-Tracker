import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			// Proxy all requests to index.html
			"/": {
				target: "/index.html",
				changeOrigin: true,
				rewrite: (path) => (path === "/" ? "/index.html" : path),
			},
		},
	},
});
