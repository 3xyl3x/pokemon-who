import { useEffect, useState } from "react";
import { getPokemons } from "./services/service";
import Picture from "./components/Picture";

function App() {
	const settings = { timer: 15, waitTimer: 3, questions: 10 };

	const [pokemons, setPokemons] = useState<Pokemon[]>();
	const [questionIndex, setQuestionIndex] = useState<number>();
	const [score, setScore] = useState<number>(0);
	const [questionsLeft, setquestionsLeft] = useState<number>(
		settings.questions
	);

	const [countdown, setCountdown] = useState<number>(0);
	const [waiting, setWaiting] = useState<boolean>(true);
	const [waitCountdown, setWaitCountdown] = useState<number>(0);

	const calculateRevealLevel = (): number => {
		return 100 - (countdown / settings.timer) * 50;
	};

	useEffect(() => {
		const fetchData = async () => {
			console.log("Fetching pokemons");
			const pokemonData = await getPokemons();
			setPokemons(pokemonData);
		};

		fetchData();

		const countdownInterval = setInterval(() => {
			setCountdown((prevCountdown) =>
				prevCountdown > 0 ? prevCountdown - 0.01 : 0
			);
		}, 10);

		const waitInterval = setInterval(() => {
			setWaitCountdown((prevCountdown) =>
				prevCountdown > 0 ? prevCountdown - 0.01 : 0
			);
		}, 10);

		return () => {
			clearInterval(countdownInterval);
			clearInterval(waitInterval);
		};
	}, []);
	useEffect(() => {
		console.log("Pokemons set,start game");
		setCountdown(settings.timer);
		setQuestionIndex(Math.floor(Math.random() * (pokemons?.length ?? 0)));
	}, [pokemons]);

	if (pokemons && countdown === 0 && waiting == false) {
		console.log("waiting for next pokemon");
		setWaiting(true);
		setWaitCountdown(settings.waitTimer);
	}
	if (pokemons && waiting && waitCountdown === 0) {
		console.log("Setting next pokemon");
		setWaiting(false);
		setCountdown(settings.timer);
	}

	return (
		<>
			<h2>
				Nedräkning: {countdown}, Vänte-nedräkning: {waitCountdown}, Frågeindex:{" "}
				{questionIndex}, RevealIndex: {calculateRevealLevel()}
			</h2>
			{pokemons?.[questionIndex ?? 0] !== undefined && (
				<Picture
					pokemon={pokemons[questionIndex ?? 0]}
					revealLevel={calculateRevealLevel()}
				/>
			)}
		</>
	);
}
export default App;
