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

export async function createCard(card: Card) {
    const cards: Card[] = await lf.getItem("cards");
    return lf.setItem("cards", cards ? [...cards, card] : [card]);
}

export async function updateCard(card: Card) {
    const cards = await getCards();
    const cardToUpdate = cards.find((d) => d.id == card.id);
    const splicedCards = cards.splice(cards.indexOf(cardToUpdate as Card), 1);
    return lf.setItem("cards", [...splicedCards, card]);
}

export async function getCardsOfDeck(deckId: number) {
    const cards: Card[] = await lf.getItem("cards");
    return cards.find((card) => card.deckId === deckId);
}

export async function getDecks(): Promise<Deck[]> {
    return lf.getItem("decks");
}

export async function getCards(): Promise<Card[]> {
    return lf.getItem("cards");
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

    /* Decks */
    for (let deckId = 1; deckId < 10; deckId++) {
        await createDeck(
            {
                id: deckId,
                name: faker.random.words(1),
                description: faker.random.words(3)
            }
        );
        for (let i = 0; i < 5; i++) {
            await createCard({
                id: i,
                deckId: deckId,
                front: faker.lorem.sentences(1),
                back: faker.lorem.sentences(1)
            });
        }
    }
}
