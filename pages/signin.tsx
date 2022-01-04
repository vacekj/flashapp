import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useAuth } from "@/src/Lib/Auth";
import { useRouter } from "next/router";
import { GoogleAuthProvider, signInAnonymously, signInWithRedirect } from "firebase/auth";
import { Box, Button, Container, Icon, VStack } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import Logo from "../src/Logo";

const Home = () => {
	const router = useRouter();
	const auth = useAuth();
	const [, loading] = useAuthState(auth);

	auth.onAuthStateChanged((user) => {
		if (user) {
			router.push("/");
		}
	});

	const googleAuthProvider = new GoogleAuthProvider();

	return (
		<Container maxW={64} mt={5}>
			<Box mb={10}>{Logo}</Box>
			{loading ? (
				<ScaleLoader color={"#00db6a"} />
			) : (
				<VStack alignItems={"center"}>
					<Button
						onClick={() => {
							signInAnonymously(auth).then((credentials) => {
								console.log(credentials);
							});
						}}
					>
						Proceed anonymously
					</Button>

					{/*Google*/}
					<Button
						leftIcon={<Icon as={FcGoogle} />}
						onClick={() => {
							signInWithRedirect(auth, googleAuthProvider).catch((e) => alert(e));
						}}
					>
						<span>Sign in via Google</span>
					</Button>
				</VStack>
			)}
		</Container>
	);
};

export default Home;
