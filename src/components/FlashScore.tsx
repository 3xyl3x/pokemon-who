import { useState, useEffect } from "react";
interface FlashScoreProps {
	score: number;
}
const FlashScore = (props: FlashScoreProps) => {
	const { score } = props;

	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (score > 0) {
			setVisible(true);

			const timeoutId = setTimeout(() => {
				setVisible(false);
			}, 1000);

			return () => clearTimeout(timeoutId);
		}
	}, [score]);

	return (
		<div className={`user-select-none flash-score ${visible ? "visible" : ""}`}>
			+{score}
		</div>
	);
};

export default FlashScore;
