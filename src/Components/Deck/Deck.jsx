import React, { useState } from "react";
import { animated, interpolate, useSprings } from "react-spring";
import { useGesture } from "react-use-gesture";
import styles from "./styles.module.css";

import ReviewCard from "./ReviewCard";

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20 });
const from = i => ({ x: 0, y: -1000, scale: 1.05, rot: 0 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `scale(${s})`;

export default function DeckWrapper(props) {
	if (props.cards.length === 0) {
		return <div className={styles.cardContainer}>No cards to review at the moment</div>;
	} else {
		return <Deck {...props} />;
	}
}

function Deck(props) {
	const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
	const [properties, set] = useSprings(props.cards.length, i => ({
		...to(i),
		from: from(i)
	})); // Create a bunch of springs using the helpers above
	// Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
	const bind = useGesture(
		({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
			const trigger = velocity > 0.1; // If you flick hard enough it should trigger the card to fly out
			const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right

			// If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
			if (!down && trigger) {
				gone.add(index);
				props.onSwipe({ index, direction: dir, cardId: props.cards[index].id });
			}

			set(i => {
				if (index !== i) return; // We're only interested in changing spring-data for the current spring
				const isGone = gone.has(index);
				const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
				const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
				const scale = down ? 1.03 : 1; // Active cards lift up a bit
				return {
					x,
					rot,
					scale,
					delay: undefined,
					config: {
						friction: 30,
						tension: down ? 800 : isGone ? 200 : 500
					}
				};
			});

			/* TODO: on finish review here*/
			if (!down && gone.size === props.cards.length)
				setTimeout(() => gone.clear() || set(i => to(i)), 600);
		}
	);

	// Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
	return properties.map(({ x, y, rot, scale }, i) => {
		return (
			<animated.div
				className={styles.cardContainer}
				key={i}
				style={{
					transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${0}px,0)`)
				}}
			>
				{/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
				<animated.div
					className={styles.card}
					{...bind(i)}
					style={{
						transform: interpolate([rot, scale], trans),
						background: getBackground(x)
					}}
				>
					<ReviewCard front={props.cards[i].front} back={props.cards[i].back} />
				</animated.div>
			</animated.div>
		);
	});
}
/* TODO: redo this, its garbage */
const hsv2rgb = function (h, s, v) {
	let rgb,
		i,
		data = [];
	if (s === 0) {
		rgb = [v, v, v];
	} else {
		h = h / 60;
		i = Math.floor(h);
		data = [v * (1 - s), v * (1 - s * (h - i)), v * (1 - s * (1 - (h - i)))];
		switch (i) {
			case 0:
				rgb = [v, data[2], data[0]];
				break;
			case 1:
				rgb = [data[1], v, data[0]];
				break;
			case 2:
				rgb = [data[0], v, data[2]];
				break;
			case 3:
				rgb = [data[0], data[1], v];
				break;
			case 4:
				rgb = [data[2], data[0], v];
				break;
			default:
				rgb = [v, data[0], data[1]];
				break;
		}
	}
	return (
		"#" +
		rgb
			.map(function (x) {
				return ("0" + Math.round(x * 255)
					.toString(16)).slice(-2);
			})
			.join("")
	);
};

const getBackground = x => {
	return interpolate([x], x => {
		x = (x / 15) + 50;
		if (x > 100) {
			x = 100;
		}
		if (x < 0) {
			x = 0;
		}
		const h = Math.floor((100 - x) * 120 / 100);
		const s = Math.abs(x - 50) / 50;
		const v = 1;

		return hsv2rgb(h, s, 1);
	});
};
