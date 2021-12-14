import "../src/index.css";

import type { AppProps } from "next/app";
import { FirebaseContext } from "../src/Lib/Firebase";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material";
import { ChakraProvider } from "@chakra-ui/react";

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

const theme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<ThemeProvider theme={theme}>
				<FirebaseContext.Provider value={firebaseConfig}>
					<Component {...pageProps} />
				</FirebaseContext.Provider>
			</ThemeProvider>
		</ChakraProvider>
	);
}

export default MyApp;
