import * as lf from "localforage";
import faker from "faker";

export async function getDeck(id: number): Promise<Deck> {
    const decks: Deck[] = await lf.getItem("decks");
    return decks.find((deck) => deck.id === id) as Deck;
}

export async function createDeck(deck: Deck) {
    const decks = await getDecks();
    return lf.setItem("decks", decks ? [...decks, deck] : [deck]);
}

export async function updateDeck(deck: Deck) {
    const decks = await getDecks();
    const deckToUpdate = decks.find((d) => d.id == deck.id);
    const splicedDecks = decks.splice(decks.indexOf(deckToUpdate as Deck), 1);
    return lf.setItem("decks", [...splicedDecks, deck]);
}

export async function saveCard(card: Card) {
    const cards: Card[] = await lf.getItem("cards");
    return lf.setItem("decks", [...cards, card]);
}

export async function getCardsOfDeck(deckId: number) {
    const cards: Card[] = await lf.getItem("cards");
    return cards.find((card) => card.deckId === deckId);
}

export async function getDecks(): Promise<Deck[]> {
    return lf.getItem("decks");
}

export interface Card {
    id: number;
    deckId: number;
    front: string;
    back: string;
}

export interface Deck {
    id: number;
    name: string;
    description: string;
}

export async function seedDatabase() {
    faker.locale = "cz";
    await lf.clear();
    for (let i = 0; i < 10; i++) {
        await createDeck(
            {
                id: i,
                name: faker.random.word(),
                description: faker.lorem.sentences(1)
            }
        );
    }
}
