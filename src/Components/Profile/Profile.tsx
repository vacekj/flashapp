import * as React from "react";
import { useDecksOfCurrentUser } from "../../Lib/Storage";
import Topbar from "../Topbar";
import { useRouter } from "next/router";
import { useUser } from "../../Lib/Auth";
import { Box, Button, chakra, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react";
import { HiOutlineUser } from "react-icons/hi";
import NextImage from "next/image";
import { formatDistanceToNow } from "date-fns";

function Profile() {
	const router = useRouter();
	const { user, signOut } = useUser();
	const { decks } = useDecksOfCurrentUser();

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

			<div className="flex flex-col justify-start">
				<div className="m-3 mt-0 text-white rounded p-5 bg-indigo-500">
					{decks?.length} decks total
				</div>
			</div>
		</main>
	);
}

const ChakraNextImage = chakra(NextImage, {
	baseStyle: { maxH: 120, maxW: 120 },
	shouldForwardProp: (prop) => ["width", "height", "src", "alt", "layout"].includes(prop),
});

export default Profile;
