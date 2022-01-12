import React, { createRef, useCallback, useEffect, useRef, useState } from "react";
import {
	Card,
	createReview,
	useCardsOfDeck,
	useCardsOfDeckOnce,
	useDeckByUid,
	useFirestore,
} from "@/src/Lib/Storage";
import {
	Box,
	Button,
	Divider,
	Flex,
	HStack,
	Icon,
	IconButton,
	Link,
	Text,
	VStack,
} from "@chakra-ui/react";
import Topbar from "@/src/Components/Topbar";
import TopbarContainer from "@/src/Components/Topbar/TopbarContainer";
import { HiArrowLeft, HiCheck, HiX } from "react-icons/hi";
import { BiUndo } from "react-icons/bi";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { addDoc, getDoc, Timestamp } from "@firebase/firestore";

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
			if (x > 600) {
				props.onSuccess(props.card);
			} else if (x < -600) {
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

export default function ReviewPage(props: Props) {
	const firestore = useFirestore();
	const { deck } = useDeckByUid(props.deckUid);
	const { cards } = useCardsOfDeckOnce(props.deckUid);
	let cardsRef = useRef<Card[]>();
	useEffect(() => {
		cardsRef.current = cards;
	}, [cards]);

	const [reviews, setReviews] = useState<Review[]>([]);
	const reviewEnded = reviews.length === cards?.length;
	const correctAnswers = reviews.filter((r) => r.value === 1).length;
	const incorrectAnswers = reviews.filter((r) => r.value === 0).length;

	useEffect(() => {
		if (reviewEnded) {
		}
	}, [reviews, reviewEnded]);

	const failCard = async () => {
		// @ts-expect-error
		const cardToFail = cardsRef.current[cardsRef.current.length - 1 - reviews.length];
		const review = await createReview(firestore, {
			cardUid: cardToFail.uid,
			created_on: Timestamp.now(),
			value: 0,
		});
		const reviewData = (await getDoc<Review>(review)).data();
		setReviews((prevState) => {
			console.log(reviewData);
			return [...prevState, reviewData!];
		});
	};

	const sucessCard = async () => {
		// @ts-expect-error
		const cardToSucc = cardsRef.current[cardsRef.current.length - 1 - reviews.length];
		const review = await createReview(firestore, {
			cardUid: cardToSucc.uid,
			created_on: Timestamp.now(),
			value: 1,
		});
		const reviewData = (await getDoc<Review>(review)).data();
		setReviews((prevState) => {
			console.log(reviewData);
			return [...prevState, reviewData!];
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
					<Box fontWeight={"medium"}>{deck?.name}</Box>
				</TopbarContainer>
			</Topbar>
			<Box bg={"background.100"} h={"full"} position={"relative"} z={1000}>
				{cards
					?.filter((card) => !reviews.find((r) => r.cardUid === card.uid))
					.map((card) => {
						return (
							<ReviewCard
								key={card.uid}
								card={card}
								onSuccess={sucessCard}
								onFailure={failCard}
							/>
						);
					})}
				{reviewEnded && (
					<VStack>
						<Box>Review ended</Box>
						<Box>
							<Text as={"span"} color={"green.500"}>
								{correctAnswers} correct
							</Text>{" "}
							answers
						</Box>
						<Box>
							<Text as={"span"} color={"red.500"}>
								{incorrectAnswers} incorrect
							</Text>{" "}
							answers
						</Box>
						<Box>
							{((correctAnswers / cards.length) * 100).toFixed(2)}% success rate
						</Box>
					</VStack>
				)}
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
					disabled={reviewEnded}
				>
					<Icon fontSize={"30"} color={"red.500"} as={HiX} />
				</Button>
				<Button
					shadow={"lg"}
					bg={"white"}
					rounded={"full"}
					aria-label={"Invalid"}
					h={14}
					w={14}
					onClick={() => {
						setReviews((prevState) => {
							return prevState.slice(0, -1);
						});
					}}
				>
					<Icon fontSize={"28"} as={BiUndo} />
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
					disabled={reviewEnded}
				>
					<Icon fontSize={"30"} color={"green.500"} as={HiCheck} />
				</Button>
			</HStack>
		</VStack>
	);
}

export type ReviewedCard = Card & {
	success: boolean;
};

export type Review = {
	created_on: Timestamp;
	cardUid: string;
	/* 0 = failure, 1 = success */
	value: 0 | 1;
};
