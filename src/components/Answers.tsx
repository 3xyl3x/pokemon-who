import { useEffect, useState } from "react";

interface AnswersProps {
	correctAnswer: string;
	showCorrect: boolean;
	pokemons: Pokemon[];
	setUserAnswer(answer: string): void;
}
const Answers = (props: AnswersProps) => {
	const { correctAnswer, showCorrect, pokemons, setUserAnswer } = props;
	const [answers, setAnswers] = useState<string[]>([]);

	useEffect(() => {
		const answers = [
			getRandomPokemonName(),
			getRandomPokemonName(),
			correctAnswer,
		];
		const shuffledArray = answers.sort(() => Math.random() - 0.5);
		setAnswers(shuffledArray);
	}, [correctAnswer]);

	const getRandomPokemonName = () => {
		const availablePokemonNames = pokemons
			.map((pokemon) => pokemon.name)
			.filter((name) => name !== correctAnswer && !answers.includes(name));
		const randomIndex = Math.floor(
			Math.random() * availablePokemonNames.length
		);
		return availablePokemonNames[randomIndex];
	};
	const handleClick = (selectedAnswer: string) => {
		setUserAnswer(selectedAnswer);
	};

	return (
		<>
			<ul className="list-group list-group-flush">
				{answers.map((answer, index) => (
					<li key={index} className="list-group-item">
						<button
							className={
								"btn btn-primary w-100 text-uppercase fw-bold py-2 " +
								(showCorrect && answer === correctAnswer ? "btn-success" : "")
							}
							disabled={showCorrect}
							onClick={() => handleClick(answer)}
						>
							{answer}
						</button>
					</li>
				))}
			</ul>
		</>
	);
};
export default Answers;
