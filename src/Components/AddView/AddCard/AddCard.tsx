import * as React from "react";
import styles from "./AddCard.module.css";
// @ts-ignore
import TextareaAutosize from "react-textarea-autosize";

// @ts-ignore

interface Props {
	placeholder?: string;
	onChange: (text: string) => void;
	value: string;
}

class AddCard extends React.Component<Props, any> {
	private textarea: TextareaAutosize;

	handleClick() {
		this.textarea.focus();
	}

	public render() {
		return (
			/*TODO: autoscale font size to fill card maybe? https://malte-wessel.com/react-textfit/*/
			<div className={styles.addCard} onClick={this.handleClick.bind(this)}>
				<TextareaAutosize
					placeholder={this.props.placeholder}
					onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
						this.props.onChange(e.target.value);
					}}
					inputRef={(tag: any) => (this.textarea = tag)}
					value={this.props.value}
				/>
			</div>
		);
	}
}

export default AddCard;
