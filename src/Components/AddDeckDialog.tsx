import * as React from "react";
import { useState } from "react";
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";

export interface NewDeck {
	name: string;
	description?: string;
}

interface Props {
	open: boolean;
	onSave: (deck: NewDeck) => Promise<void>;
	onClose: () => void;
}

const AddDeckDialog = (props: Props) => {
	const [deckName, setDeckName] = useState("");
	const [deckDescription, setDeckDescription] = useState("");

	return (
		<Modal isOpen={props.open} onClose={props.onClose} isCentered>
			<ModalOverlay />
			<ModalContent m={10}>
				<ModalHeader>Create a new Deck</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<form
						onSubmit={() => {
							if (deckName.length === 0) {
								return;
							}
							props.onSave({
								name: deckName,
								description: deckDescription,
							});
						}}
					>
						<FormControl isRequired>
							<FormLabel htmlFor="name">Name</FormLabel>
							<Input
								onChange={(e) => setDeckName(e.target.value)}
								id="name"
								type="name"
							/>
						</FormControl>
						{/*<FormControl>*/}
						{/*	<FormLabel htmlFor="description">Description</FormLabel>*/}
						{/*	<Textarea*/}
						{/*		onChange={(e) => setDeckDescription(e.target.value)}*/}
						{/*		id="description"*/}
						{/*		type="description"*/}
						{/*	/>*/}
						{/*</FormControl>*/}
					</form>
				</ModalBody>

				<ModalFooter>
					<Button
						colorScheme="blue"
						onClick={() => {
							if (deckName.length === 0) {
								return;
							}
							props.onSave({
								name: deckName,
								description: deckDescription,
							});
						}}
					>
						Add
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AddDeckDialog;
