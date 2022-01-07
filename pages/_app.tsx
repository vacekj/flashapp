import "../src/index.css";
import "../src/tailwind.css";

import type { AppProps } from "next/app";
import { FirebaseContext } from "@/src/Lib/Firebase";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const firebaseConfig = {
	apiKey: "AIzaSyCdhcK-DNwIam9Tq-iUJoekbSgPfECbUX8",
	authDomain: "flashapp-cz.firebaseapp.com",
	databaseURL: "https://flashapp-cz.firebaseio.com",
	projectId: "flashapp-cz",
	storageBucket: "flashapp-cz.appspot.com",
	messagingSenderId: "574846765511",
	appId: "1:574846765511:web:e13cc04773a7dfd609b1e2",
	measurementId: "G-1CCSX7MC9F",
};

const chakraTheme = extendTheme({
	colors: {
		gray: {
			50: "#f9fafb",
			100: "#f3f4f6",
			200: "#e5e7eb",
			300: "#d1d5db",
			400: "#9ca3af",
			500: "#6b7280",
			600: "#4b5563",
			700: "#374151",
			800: "#1f2937",
			900: "#111827",
		},
		background: {
			"100": "#F9F9F9",
		},
	},
	shadows: {
		lg: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={chakraTheme}>
			<FirebaseContext.Provider value={firebaseConfig}>
				<Component {...pageProps} />
			</FirebaseContext.Provider>
		</ChakraProvider>
	);
}

export default MyApp;
