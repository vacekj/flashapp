import React, { createRef, useCallback, useEffect, useRef, useState } from "react";
import { Card, useCardsOfDeck, useDeckByUid } from "@/src/Lib/Storage";
import {
	Box,
	Button,
	Divider,
	Flex,
	HStack,
	Icon,
	IconButton,
	Link,
	VStack,
} from "@chakra-ui/react";
import Topbar from "@/src/Components/Topbar";
import TopbarContainer from "@/src/Components/Topbar/TopbarContainer";
import { HiArrowLeft, HiCheck, HiX } from "react-icons/hi";
import { BiUndo } from "react-icons/bi";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface Props {
	deckUid: string;
}

function ReviewCard(props: {
	card: Card;
	onSuccess: (card: Card) => void;
	onFailure: (card: Card) => void;
}) {
	const x = useMotionValue(0);
	const background = useTransform(x, [-100, 0, 100], ["#f00", "#fff", "#0f0"]);

	const [backShown, setBackShown] = useState(false);

	useEffect(() => {
		return x.onChange((x) => {
			if (x > 300) {
				props.onSuccess(props.card);
			} else if (x < -300) {
				props.onFailure(props.card);
			}
		});
	});

	return (
		<VStack
			spacing={4}
			onTap={() => {
				setBackShown(true);
			}}
			key={props.card.uid}
			as={motion.div}
			style={{
				// @ts-ignore
				x: x,
				// @ts-ignore
				backgroundColor: background,
			}}
			drag="x"
			dragConstraints={{ right: 0, left: -0 }}
			whileTap={{ cursor: "grabbing", scale: 1.02 }}
			left={0}
			dragElastic={1}
			right={0}
			mx={"auto"}
			transformOrigin={"center top"}
			w={"80vw"}
			maxW={"600px"}
			top={0}
			h={"full"}
			maxH={"80vh"}
			position={"absolute"}
			zIndex={100}
			rounded={"xl"}
			shadow={"lg"}
			bg={"white"}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<Box>{props.card.front}</Box>
			{backShown && (
				<>
					<Divider />
					<Box>{props.card.back}</Box>
				</>
			)}
		</VStack>
	);
}

export default function Review(props: Props) {
	const { deck } = useDeckByUid(props.deckUid);
	const { cards } = useCardsOfDeck(props.deckUid);
	let cardsRef = useRef<Card[]>();
	useEffect(() => {
		cardsRef.current = cards;
	}, [cards]);

	const [reviewedCards, setReviewedCards] = useState<Card[]>([]);
	const reviewEnded = reviewedCards.length === cards?.length;

	const failCard = () => {
		setReviewedCards((prevState) => {
			// @ts-ignore
			const cardToFail = cardsRef.current[cardsRef.current.length - 1 - reviewedCards.length];
			return [...prevState, cardToFail];
		});
	};

	const sucessCard = () => {
		setReviewedCards((prevState) => {
			const cardToSuccess =
				// @ts-ignore
				cardsRef.current[cardsRef.current.length - 1 - reviewedCards.length];
			return [...prevState, cardToSuccess];
		});
	};

	return (
		<VStack alignItems={"stretch"} justifyContent={"stretch"}>
			<Topbar mb={3}>
				<TopbarContainer>
					<Link href={"/"}>
						<IconButton
							variant={"ghost"}
							aria-label={"Add card"}
							fontSize={"3xl"}
							icon={<Icon as={HiArrowLeft} />}
						/>
					</Link>
					<Box onClick={() => setReviewedCards([])}>{reviewEnded ? "End" : "going"}</Box>
				</TopbarContainer>
			</Topbar>
			<Box bg={"background.100"} h={"full"} position={"relative"} z={1000}>
				{cards
					?.filter((card) => !reviewedCards.includes(card))
					.map((card) => {
						return (
							<ReviewCard
								key={card.uid}
								card={card}
								onSuccess={(changedCard: Card) => {
									console.log("succ");
									setReviewedCards([...reviewedCards, changedCard]);
								}}
								onFailure={(changedCard: Card) => {
									console.log("fail");
									setReviewedCards([...reviewedCards, changedCard]);
								}}
							/>
						);
					})}
			</Box>
			<HStack justifyContent={"space-around"} p={6} pt={3} w={"full"}>
				<Button
					size={"lg"}
					shadow={"lg"}
					bg={"white"}
					rounded={"full"}
					aria-label={"Invalid"}
					h={16}
					w={16}
					onClick={failCard}
				>
					<Icon fontSize={"30"} color={"red.500"} as={HiX} />
				</Button>
				<Button
					size={"lg"}
					shadow={"lg"}
					bg={"white"}
					rounded={"full"}
					aria-label={"Invalid"}
					h={16}
					w={16}
					onClick={() => {
						setReviewedCards((prevState) => {
							return prevState.slice(0, -1);
						});
					}}
				>
					<Icon fontSize={"30"} as={BiUndo} />
				</Button>
				<Button
					size={"lg"}
					shadow={"lg"}
					bg={"white"}
					rounded={"full"}
					aria-label={"Invalid"}
					h={16}
					w={16}
					onClick={sucessCard}
				>
					<Icon fontSize={"30"} color={"green.500"} as={HiCheck} />
				</Button>
			</HStack>
		</VStack>
	);
}
