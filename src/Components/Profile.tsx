import * as React from "react";
import {
	REVIEWS_COLLECTION,
	useDecksOfCurrentUser,
	useFirestore,
	useReviewsOfDeck,
} from "@/src//Lib/Storage";
import Topbar from "@/src/Components/Topbar";
import { useRouter } from "next/router";
import { useUser } from "@/src/Lib/Auth";
import { Box, Button, chakra, HStack, Text, VStack } from "@chakra-ui/react";
import NextImage from "next/image";
import { formatDistanceToNow } from "date-fns";
import ProfileReviewHistory from "@/src/Components/ProfileReviewHistory";
import { useCollectionData, useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { collection } from "@firebase/firestore";
import { Review } from "@/src/Components/ReviewPage";

function Profile() {
	const router = useRouter();
	const { user, signOut } = useUser();
	const db = useFirestore();
	const [reviews] = useCollectionData<Review>(collection(db, REVIEWS_COLLECTION));
	return (
		<main className="flex flex-1 flex-col">
			<Topbar>
				<HStack p={2} px={4} justifyContent={"space-between"} alignItems={"center"}>
					<Text fontSize={"3xl"} fontWeight={"medium"}>
						Profile
					</Text>
					<Button
						onClick={async () => {
							await signOut();
							await router.push("/signin");
						}}
					>
						Sign out
					</Button>
				</HStack>
			</Topbar>

			<VStack rounded={"xl"} shadow={"lg"} p={[5]} m={[3]} bg={"white"}>
				{user?.photoURL && (
					<ChakraNextImage
						rounded={"full"}
						src={user?.photoURL}
						width={"100px"}
						height={"100px"}
					/>
				)}
				<div className="font-semibold text-xl">
					{user?.displayName ?? user?.email ?? "Anonymous"}
				</div>
				{user?.displayName && <div className="text-gray-700">{user?.email}</div>}
				{user?.metadata.creationTime && (
					<Box>
						Registered for {formatDistanceToNow(new Date(user?.metadata.creationTime))}
					</Box>
				)}
			</VStack>

			<VStack h={96} bg={"white"} rounded={"lg"} shadow={"lg"} m={3} p={3}>
				<ProfileReviewHistory reviews={reviews} />
			</VStack>
		</main>
	);
}

const ChakraNextImage = chakra(NextImage, {
	baseStyle: { maxH: 120, maxW: 120 },
	shouldForwardProp: (prop) => ["width", "height", "src", "alt", "layout"].includes(prop),
});

export default Profile;
