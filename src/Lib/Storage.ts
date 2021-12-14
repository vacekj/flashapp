import {
	getFirestore,
	collection,
	DocumentSnapshot,
	Timestamp,
	where,
	doc,
	getDocs,
} from "@firebase/firestore";
import { DocumentReference, query } from "@firebase/firestore";
import { useFirebaseApp } from "./Firebase";
import { useUser } from "./Auth";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";

export const DECKS_COLLECTION = "decks";
export const CARDS_COLLECTION = "cards";

function getTimeStamp(date: Date) {
	return Timestamp.fromDate(date);
}

export function useFirestore() {
	const app = useFirebaseApp();
	return getFirestore(app);
}

export async function getCardsOfDeck(deckUid: string) {
	const firestore = useFirestore();
	const collectionRef = collection(firestore, CARDS_COLLECTION);
	const q = query(collectionRef, where("deckUid", "==", deckUid), where("deleted", "!=", true));
	const cardsSnapshost = await getDocs(q);
	return cardsSnapshost.docs.map((snapshot) => snapshot.data()) as Card[];
}

export async function createDeck(deck: DeckToSave) {
	const doc: Omit<Deck, "uid"> = {
		...deck,
		createdAt: getTimeStamp(new Date()),
		updatedAt: getTimeStamp(new Date()),
		ownerUid: this.firebase.auth().currentUser?.uid as string,
	};
	return (await this.db
		.collection(DECKS_COLLECTION)
		.add(doc)) as unknown as DocumentReference<Deck>;
}

export async function deleteDeck(deckUid: string) {
	return await this.db.collection(DECKS_COLLECTION).doc(deckUid).update({
		deleted: true,
	});
}

export function useDeckByUid(deckUid: string) {
	const firestore = useFirestore();
	const collectionRef = collection(firestore, DECKS_COLLECTION);
	// @ts-ignore
	const docRef: DocumentReference<Deck> = doc<Deck>(collectionRef, deckUid);
	const [deck, loading, error] = useDocumentData<Deck>(docRef);
	return {
		deck,
		loading,
		error,
	};
}

export async function getDecksOfUser(userUid: string) {
	const res = await this.db.collection(DECKS_COLLECTION).where("ownerUid", "==", userUid).get();
	return res.docs
		.map((snapshot) => {
			return snapshot.data(); /*TODO: does this return uid as well?*/
		})
		.filter((data) => data.deleted !== true) as Deck[];
}

export function useDecksOfCurrentUser() {
	const app = useFirebaseApp();
	const { user } = useUser();
	const collectionRef = collection(getFirestore(app), DECKS_COLLECTION);
	const q = query(collectionRef, where("ownerUid", "==", user?.uid ?? ""));

	const [decks, loading, error] = useCollectionData(q);
	const mappedDecks = decks
		?.map((snapshot) => {
			return {
				...snapshot.data(),
				uid: snapshot.id,
			} as Deck;
		})
		.filter((data) => data.deleted !== true) as Deck[];

	return { decks: mappedDecks ?? [], loading, error };
}

export function useCardsOfDeck(deckUid: string) {
	const firestore = useFirestore();
	const collectionRef = collection(firestore, CARDS_COLLECTION);
	const q = query(collectionRef, where("deckUid", "==", deckUid), where("deleted", "!=", true));
	const [cards, loading, error] = useCollectionData(q);
	return { cards, loading, error };
}

export async function createCard(card: CardToAdd) {
	const doc: Omit<Card, "uid"> = {
		...card,
		createdAt: getTimeStamp(new Date()),
		updatedAt: getTimeStamp(new Date()),
	};
	await this.db
		.collection(DECKS_COLLECTION)
		.doc(card.deckUid)
		.update({
			lastAdditionAt: getTimeStamp(new Date()),
		} as Partial<Deck>);
	return (await this.db
		.collection(CARDS_COLLECTION)
		.add(doc)) as unknown as DocumentReference<Card>;
}

export async function updateCard(card: CardToEdit) {
	const doc:
		| Omit<Card, "uid" | "deckUid">
		| {
				front?: string;
				back?: string;
		  } = {
		...card,
		updatedAt: getTimeStamp(new Date()),
	};
	return await this.db.collection(CARDS_COLLECTION).doc(card.uid).update(doc);
}

export async function deleteCard(cardUid: string) {
	return await this.db.collection(CARDS_COLLECTION).doc(cardUid).update({
		deleted: true,
	});
}

export type CardToEdit = {
	uid: string;
} & (
	| {
			front: string;
	  }
	| {
			back: string;
	  }
	| {
			front: string;
			back: string;
	  }
);

export interface CardToAdd {
	front: string;
	back: string;
	deckUid: string;
}

export interface Card extends CardToAdd {
	uid: string;
	createdAt?: Timestamp;
	updatedAt?: Timestamp;
	deleted?: boolean;
}

export interface DeckToSave {
	name: string;
	description: string;
}

export interface Deck extends DeckToSave {
	uid: string;
	ownerUid: string;
	createdAt: Timestamp;
	updatedAt: Timestamp;
	lastAdditionAt?: Timestamp;
	deleted?: boolean;
}

export interface Revision {
	uid: string;
	cardUid: string;
	result: boolean;
	time: number;
}
