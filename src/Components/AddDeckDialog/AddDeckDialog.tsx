import * as React from "react";
import {useState} from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	makeStyles,
	TextField
} from "@material-ui/core";

export interface NewDeck {
	name: string;
	description?: string;
}

interface Props {
	open: boolean;
	onSave: (deck: NewDeck) => void;
	onClose: () => void;
}

const useStyles = makeStyles({
	label: {
		color: "#bdbdbd"
	}
});

const AddDeckDialog = (props: Props) => {
	const [state, setState] = useState<NewDeck>({
		name: ""
	});

	const styles = useStyles();

	return (
		<Dialog open={props.open} onClose={props.onClose}>
			<DialogTitle>Create a new deck</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Deck name"
					fullWidth
					autoComplete={"off"}
					onChange={e => {
						setState({
							...state,
							name: e.target.value
						});
					}}
				/>
				<TextField
					multiline
					margin="dense"
					id="description"
					label="Deck description"
					fullWidth
					onChange={e => {
						setState({
							...state,
							description: e.target.value
						});
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={props.onClose}
					classes={{
						label: styles.label
					}}
					color="primary"
				>
					Cancel
				</Button>
				<Button
					onClick={() => {
						props.onClose();
						props.onSave(state);
					}}
					color="primary"
					variant={"contained"}
					disabled={state.name.length < 1}
				>
					Create deck
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddDeckDialog;
