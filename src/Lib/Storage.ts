import {
	getFirestore,
	collection,
	DocumentSnapshot,
	Timestamp,
	where,
	doc,
	getDocs,
	CollectionReference,
	Firestore,
	addDoc,
	updateDoc,
	FirestoreError,
} from "@firebase/firestore";
import { DocumentReference, query } from "@firebase/firestore";
import { useFirebaseApp } from "./Firebase";
import { useUser } from "./Auth";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { useEffect, useMemo, useState } from "react";
import Review from "@/src/Components/Review";

export const DECKS_COLLECTION = "decks";
export const CARDS_COLLECTION = "cards";
export const REVIEWS_COLLECTION = "reviews";

function getTimeStamp(date: Date) {
	return Timestamp.fromDate(date);
}

export function useFirestore() {
	const app = useFirebaseApp();
	return getFirestore(app);
}

export async function getCardsOfDeck(db: Firestore, deckUid: string) {
	const collectionRef = collection(db, CARDS_COLLECTION);
	const q = query(collectionRef, where("deckUid", "==", deckUid));
	const cardsSnapshost = await getDocs(q);
	return cardsSnapshost.docs.map((snapshot) => snapshot.data()) as Card[];
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

export function useDecksOfCurrentUser() {
	console.log("useDecksOfCurrentUser called");
	const app = useFirebaseApp();
	const { user } = useUser();

	const q = useMemo(() => {
		const collectionRef = collection(
			getFirestore(app),
			DECKS_COLLECTION
		) as CollectionReference<Deck>;
		return query<Deck>(collectionRef, where("ownerUid", "==", user?.uid ?? ""));
	}, [app, user]);

	const [decks, loading, error] = useCollectionData<Deck>(q, {
		idField: "uid",
	});

	const mappedDecks = decks?.filter((data) => data.deleted !== true) as Deck[];

	return { decks: mappedDecks ?? [], loading, error };
}

export function useAllCardsOfUser() {
	const { decks } = useDecksOfCurrentUser();
	const firestore = useFirestore();
	const [cards, setCards] = useState<Card[] | undefined>(undefined);
	useEffect(() => {
		if (!decks.length) {
			return;
		}
		const promises = decks.map((deck) => getCardsOfDeck(firestore, deck.uid));
		Promise.all(promises)
			.then((cardsOfDecks) => {
				setCards(cardsOfDecks.flat());
			})
			.catch((e) => console.error(e));
	}, [decks]);

	return { cards };
}

export async function getRevisionsOfCard(db: Firestore, cardUid: string) {
	const collectionRef = collection(db, REVIEWS_COLLECTION);
	const q = query(collectionRef, where("cardUid", "==", cardUid));
	const reviewsSnapshot = await getDocs(q);
	return reviewsSnapshot.docs.map((snapshot) => snapshot.data()) as Revision[];
}

export function useReviewsOfDeck(deckUid: string) {
	const firestore = useFirestore();
	const { cards, loading, error } = useCardsOfDeck(deckUid);
	const [revisions, setRevisions] = useState<Revision[]>();
	useEffect(() => {
		if (!cards?.length) {
			return;
		}
		const promises = cards.map((card) => getRevisionsOfCard(firestore, card.uid));
		Promise.all(promises)
			.then((cardsOfDecks) => {
				setRevisions(cardsOfDecks.flat());
			})
			.catch((e) => console.error(e));
	}, [cards]);

	return { revisions, loading, error };
}

export function useCardsOfDeck(deckUid: string) {
	const firestore = useFirestore();
	const collectionRef = collection(firestore, CARDS_COLLECTION);
	const q = query(collectionRef, where("deckUid", "==", deckUid));
	// @ts-expect-error
	const [cards, loading, error] = useCollectionData<Card[]>(q);
	// @ts-expect-error
	return { cards, loading, error } as {
		cards: Card[];
		loading: boolean;
		error: FirestoreError | undefined;
	};
}

export async function createCard(db: Firestore, card: CardToAdd) {
	const cardToAdd: Omit<Card, "uid"> = {
		...card,
		createdAt: getTimeStamp(new Date()),
		updatedAt: getTimeStamp(new Date()),
	};

	/*Update last-added-to for Deck*/
	await updateDoc(doc(collection(db, DECKS_COLLECTION), card.deckUid), {
		lastAdditionAt: getTimeStamp(new Date()),
	});

	/*Insert card into Cards collection*/
	return await addDoc(collection(db, CARDS_COLLECTION), cardToAdd);
}

export function getCardsStatus(cards: Card[], revisions: Revision[]) {
	return cards.map((card) => {
		const hasBeenReviewed = revisions.find((revision) => revision.cardUid === card.uid);
		return { ...card, hasBeenReviewed };
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
	/*True = remember, False = don't remember*/
	result: boolean;
	/*Time in miliseconds from seeing the card to answer*/
	time: number;
}
