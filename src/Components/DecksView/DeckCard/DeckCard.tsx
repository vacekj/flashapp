import React, { useState } from "react";
import { Deck } from "@/src/Lib/Storage";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import DeckDetail from "../DeckDetail";
import Link from "next/link";

interface Props {
	deck: Deck;
	score?: number /*0 to 100*/;
	onDeckDelete: (deckUid: string) => Promise<void>;
}

export default function DeckCard(props: Props) {
	const [detailOpen, setDetailOpen] = useState(false);
	return (
		<>
			<DeckDetail
				deck={props.deck}
				onDeckDelete={props.onDeckDelete}
				open={detailOpen}
				onClose={() => {
					setDetailOpen(false);
				}}
			/>
			<HStack p={5} justifyContent={"space-between"} bg={"white"} mx={3} rounded={"lg"}>
				<Box onClick={() => setDetailOpen(true)} flexGrow={2}>
					<Text fontSize={"lg"} fontWeight={"bold"}>
						{props.deck.name}
					</Text>
				</Box>
				<Box className="items-end">
					<Link href={"/decks/" + props.deck.uid}>
						<Button variant={"solid"} color={""} as={"a"}>
							Review
						</Button>
					</Link>
				</Box>
			</HStack>
		</>
	);
}
