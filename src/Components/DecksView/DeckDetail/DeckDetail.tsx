import React, { useState } from "react";
import { Deck, DECKS_COLLECTION, useFirestore } from "@/src/Lib/Storage";
import {
	Button,
	HStack,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	VStack,
} from "@chakra-ui/react";
import { doc, updateDoc } from "@firebase/firestore";

interface Props {
	deck: Deck;
	open: boolean;
	onClose: () => void;
	onDeckDelete: (deckUid: string) => Promise<void>;
}

const DeckDetail = (props: Props) => {
	const [deckName, setDeckName] = useState(props.deck.name);
	const db = useFirestore();

	return (
		<Modal isOpen={props.open} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent m={5}>
				<ModalCloseButton />
				<ModalHeader>{props.deck.name}</ModalHeader>
				<ModalBody>
					<HStack alignItems={"stretch"} spacing={1} mt={2}>
						<Input value={deckName} onChange={(e) => setDeckName(e.target.value)} />
						<Button
							variant={"outline"}
							onClick={() => {
								updateDoc(doc(db, DECKS_COLLECTION, props.deck.uid), {
									...props.deck,
									name: deckName,
								});
							}}
						>
							Rename
						</Button>
					</HStack>
				</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default DeckDetail;
