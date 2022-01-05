import * as React from "react";
import { useDecksOfCurrentUser } from "../../Lib/Storage";
import Topbar from "../Topbar";
import { useRouter } from "next/router";
import { useUser } from "../../Lib/Auth";
import { Button, HStack, Icon, Text } from "@chakra-ui/react";
import { HiOutlineUser } from "react-icons/hi";

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

			<div className="flex flex-col rounded-lg shadow p-5 m-3 bg-white">
				<div className="flex mb-3">
					<Icon mr={4} rounded={"full"} h={16} as={HiOutlineUser} />
					<div className="w-2/3 flex flex-col justify-center">
						<div className="font-semibold text-xl">
							{user?.displayName ?? user?.email ?? "Anonymous"}
						</div>
						{user?.displayName && <div className="text-gray-700">{user?.email}</div>}
					</div>
				</div>

				<div>
					<div className="text-sm text-gray-700 leading-snug">
						Member since: {user?.metadata.creationTime}
					</div>
					<div className="text-sm text-gray-700 leading-snug">
						Last sign-in: {user?.metadata.creationTime}
					</div>
				</div>
			</div>

			<div className="flex flex-col justify-start">
				<div className="m-3 mt-0 text-white rounded p-5 bg-indigo-500">
					{decks?.length} decks total
				</div>
			</div>
		</main>
	);
}
export default Profile;
