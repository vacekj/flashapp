import firebase, {firestore} from "firebase";

export default class StorageHandler {
	private firebase: firebase.app.App;
	private db: firebase.firestore.Firestore;
	private static DECKS_COLLECTION = "decks";
	private static CARDS_COLLECTION = "cards";

	constructor(firebase: firebase.app.App) {
		this.firebase = firebase;
		this.db = this.firebase.firestore();
	}

	private static getTimeStamp(date: Date) {
		return firebase.firestore.Timestamp.fromDate(date);
	}

	async createDeck(deck: DeckToSave) {
		const doc: Omit<Deck, "uid"> = {
			...deck,
			createdAt: StorageHandler.getTimeStamp(new Date()),
			updatedAt: StorageHandler.getTimeStamp(new Date()),
			ownerUid: this.firebase.auth().currentUser?.uid as string
		};
		return (await this.db
			.collection(StorageHandler.DECKS_COLLECTION)
			.add(doc)) as firestore.DocumentReference<Deck>;
	}

	async deleteDeck(deckUid: string) {
		return await this.db
			.collection(StorageHandler.DECKS_COLLECTION)
			.doc(deckUid)
			.update({
				deleted: true
			});
	}

	async getDeckByUid(deckUid: string) {
		return (await this.db
			.collection(StorageHandler.DECKS_COLLECTION)
			.doc(deckUid)
			.get()) as firestore.DocumentSnapshot<Deck>;
	}

	async getDecksOfUser(userUid: string) {
		const res = await this.db
			.collection(StorageHandler.DECKS_COLLECTION)
			.where("ownerUid", "==", userUid)
			.get();
		return res.docs
			.map(snapshot => {
				return snapshot.data(); /*TODO: does this return uid as well?*/
			})
			.filter(data => data.deleted !== true) as Deck[];
	}

	async getDecksOfCurrentUser() {
		if (!this.firebase.auth().currentUser) {
			return [];
		}
		const res = await this.db
			.collection(StorageHandler.DECKS_COLLECTION)
			.where("ownerUid", "==", this.firebase.auth().currentUser?.uid)
			.get();
		return res.docs
			.map(snapshot => {
				return {
					...snapshot.data(),
					uid: snapshot.id
				} as Deck;
			})
			.filter(data => data.deleted !== true) as Deck[];
	}

	async getCardsOfDeck(deckUid: string) {
		const res = await this.db
			.collection(StorageHandler.CARDS_COLLECTION)
			.where("deckUid", "==", deckUid)
			.get();
		return res.docs
			.map(snapshot => {
				return {
					...snapshot.data(),
					uid: snapshot.id
				} as Card;
			})
			.filter(card => card.deleted !== true) as Card[];
	}

	async createCard(card: CardToAdd) {
		const doc: Omit<Card, "uid"> = {
			...card,
			createdAt: StorageHandler.getTimeStamp(new Date()),
			updatedAt: StorageHandler.getTimeStamp(new Date())
		};
		await this.db.collection(StorageHandler.DECKS_COLLECTION).doc(card.deckUid).update(<Partial<Deck>>{
			lastAdditionAt: StorageHandler.getTimeStamp(new Date())
		});
		return (await this.db
			.collection(StorageHandler.CARDS_COLLECTION)
			.add(doc)) as firestore.DocumentReference<Card>;
	}

	async updateCard(card: CardToEdit) {
		const doc:
			| Omit<Card, "uid" | "deckUid">
			| {
			front?: string;
			back?: string;
		} = {
			...card,
			updatedAt: StorageHandler.getTimeStamp(new Date())
		};
		return await this.db
			.collection(StorageHandler.CARDS_COLLECTION)
			.doc(card.uid)
			.update(doc);
	}

	async deleteCard(cardUid: string) {
		return await this.db
			.collection(StorageHandler.CARDS_COLLECTION)
			.doc(cardUid)
			.update({
				deleted: true
			});
	}
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
	createdAt?: firebase.firestore.Timestamp;
	updatedAt?: firebase.firestore.Timestamp;
	deleted?: boolean;
}

export interface DeckToSave {
	name: string;
	description: string;
}

export interface Deck extends DeckToSave {
	uid: string;
	ownerUid: string;
	createdAt: firebase.firestore.Timestamp;
	updatedAt: firebase.firestore.Timestamp;
	lastAdditionAt?: firebase.firestore.Timestamp;
	deleted?: boolean;
}
