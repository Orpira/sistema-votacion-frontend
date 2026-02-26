import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@context": path.resolve(__dirname, "./src/context"),
			"@services": path.resolve(__dirname, "./src/services"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@types": path.resolve(__dirname, "./src/types"),
			"@styles": path.resolve(__dirname, "./src/styles"),
		},
	},
	server: {
		port: 3000,
		strictPort: false,
		open: true,
	},
	build: {
		outDir: "docs",
		sourcemap: false,
	},
	define: {
		"process.env": {},
		__DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
	},
});
