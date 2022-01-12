import React, { useState } from "react";
import { Deck, getCardsStatus, useCardsOfDeck, useReviewsOfDeck } from "@/src/Lib/Storage";
import { Box, Button, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import DeckDetail from "../DeckDetail";
import Link from "next/link";
import { Card } from "@/src/Lib/Storage";
import { formatDistance } from "date-fns";
import { HiTrash } from "react-icons/hi";
import { Review } from "@/src/Components/ReviewPage";

interface Props {
	deck: Deck;
	score?: number /*0 to 100*/;
	onDeckDelete: (deckUid: string) => Promise<void>;
}

export default function DeckCard(props: Props) {
	const [detailOpen, setDetailOpen] = useState(false);
	const { cards, error, loading } = useCardsOfDeck(props.deck.uid);
	const { revisions } = useReviewsOfDeck(props.deck.uid);

	const cardsWithStatus = getCardsStatus(cards ?? [], revisions ?? []);

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
			<SimpleGrid shadow={"lg"} rounded={"xl"} mx={3} bg={"white"} p={5}>
				<HStack justifyContent={"space-between"}>
					<Box flexGrow={2}>
						<Text
							fontSize={"2xl"}
							onClick={() => setDetailOpen(true)}
							fontWeight={"bold"}
						>
							{props.deck.name}
						</Text>
					</Box>
					<Box className="items-end">
						<Link href={cards?.length ? "/decks/" + props.deck.uid : "#"}>
							<Button
								disabled={cards?.length === 0}
								variant={"solid"}
								color={""}
								as={"a"}
							>
								Review
							</Button>
						</Link>
					</Box>
				</HStack>
				{cards?.length ? (
					<CardsStats cardsWithStatus={cardsWithStatus} />
				) : (
					<Box my={3}>
						There are no cards in this deck yet.{" "}
						<Link href={"/add?deck=" + props.deck.uid}>
							<Button variant={"link"}>Click here to add some!</Button>
						</Link>{" "}
					</Box>
				)}
				<HStack justifyContent={"space-between"}>
					<Text fontSize={"sm"} color={"gray.400"}>
						Created{" "}
						{formatDistance(props.deck.createdAt.toDate(), new Date(), {
							addSuffix: true,
						})}
					</Text>
					<Button
						variant={"ghost"}
						colorScheme={"red"}
						onClick={() => props.onDeckDelete(props.deck.uid)}
						leftIcon={<HiTrash />}
					>
						Delete deck
					</Button>
				</HStack>
			</SimpleGrid>
		</>
	);
}

function CardsStats(props: {
	cardsWithStatus: (Card & { hasBeenReviewed: Review | undefined })[];
}) {
	const reviewedCards = props.cardsWithStatus.filter((card) => card.hasBeenReviewed);
	const unseenCards = props.cardsWithStatus.filter((card) => !card.hasBeenReviewed);

	return (
		<SimpleGrid columns={3} rows={1} spacing={3} m={3}>
			<VStack p={2} rounded={"lg"}>
				<Text fontSize={"lg"} fontWeight={"600"} color={"green.500"}>
					{reviewedCards.length}
				</Text>
				<Text fontSize={"sm"} color={"gray.600"}>
					Reviewed
				</Text>
			</VStack>
			<VStack p={2} rounded={"lg"}>
				<Text fontSize={"lg"} fontWeight={"600"}>
					{unseenCards.length}
				</Text>
				<Text fontSize={"sm"} color={"gray.600"}>
					Unseen
				</Text>
			</VStack>
			<VStack p={2} rounded={"lg"}>
				<Text fontSize={"lg"} fontWeight={"600"}>
					{unseenCards.length + reviewedCards.length}
				</Text>
				<Text fontSize={"sm"} color={"gray.600"}>
					Total
				</Text>
			</VStack>
		</SimpleGrid>
	);
}
