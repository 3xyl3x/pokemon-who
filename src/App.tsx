import { useEffect, useState } from "react";
import getPokemons from "./services/service";
import "./App.css";
import Picture from "./components/Picture";
import Answers from "./components/Answers";
import FlashScore from "./components/FlashScore";
import "bootstrap/dist/css/bootstrap.min.css";
import HighScoreModal from "./components/HighScoreModal";

function App() {
	const settings = { timer: 10, waitTimer: 2, questions: 3 };

	const [pokemons, setPokemons] = useState<Pokemon[]>();
	const [questionIndex, setQuestionIndex] = useState<number>();
	const [score, setScore] = useState<number>(0);
	const [gainedScore, setGainedScore] = useState<number>(0);
	const [questionsLeft, setquestionsLeft] = useState<number>(
		settings.questions
	);
	const [revealLevel, setRevealLevel] = useState<number>(0);
	const [countdown, setCountdown] = useState<number>(0);
	const [waiting, setWaiting] = useState<boolean>(true);
	const [waitCountdown, setWaitCountdown] = useState<number>(0);
	const [showHSModal, setShowHSModal] = useState(false);

	const handleModalClose = () => {
		setShowHSModal(false);
		setQuestionIndex(Math.floor(Math.random() * (pokemons?.length ?? 0)));
		setWaiting(false);
		setCountdown(settings.timer);
		setGainedScore(0);
		setScore(0);
		setquestionsLeft(settings.questions);
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
		setRevealLevel(100 - (countdown / settings.timer) * 50);
	}, [countdown]);

	useEffect(() => {
		console.log("Pokemons set,start game");
		setCountdown(settings.timer);
		setquestionsLeft(settings.questions);
		setQuestionIndex(Math.floor(Math.random() * (pokemons?.length ?? 0)));
	}, [pokemons]);

	if (pokemons && countdown === 0 && waiting == false && !showHSModal) {
		console.log("waiting for next pokemon");
		setWaiting(true);
		setWaitCountdown(settings.waitTimer);
	}
	if (pokemons && waiting && waitCountdown === 0 && !showHSModal) {
		console.log("Setting next pokemon");
		setQuestionIndex(Math.floor(Math.random() * (pokemons?.length ?? 0)));
		setWaiting(false);
		setCountdown(settings.timer);
		setGainedScore(0);
		setquestionsLeft((prevQuestionsLeft) => prevQuestionsLeft - 1);
	}

	// GAME OVER
	if (questionsLeft === 0 && !showHSModal) {
		setCountdown(0);
		setquestionsLeft((prevQuestionsLeft) => prevQuestionsLeft - 1);
		setShowHSModal(true);
	}

	function setUserAnswer(answer: string) {
		if (answer === pokemons[questionIndex ?? 0]?.name) {
			let points = Math.round(countdown);
			setScore((prevScore) => prevScore + points);
			setGainedScore(points);
		}
		setCountdown(0);
		setWaiting(true);
		setWaitCountdown(settings.waitTimer);
	}

	return (
		<>
			<p>
				Poäng: {score} , gainedPoäng: {gainedScore} ,Nedräkning: {countdown},
				Vänte-nedräkning: {waitCountdown}, Frågeindex: {questionIndex},
				RevealIndex: {revealLevel}, frågor kvar: {questionsLeft}
			</p>
			{pokemons?.[questionIndex ?? 0] !== undefined && (
				<>
					{showHSModal && (
						<HighScoreModal score={score} onClose={handleModalClose} />
					)}
					<div className="card col-md-6 col-lg-4 col-xl-3 mx-auto border-0  text-center m-2">
						<h1 className="py-2">
							Score: <span className="badge bg-success"> {score}</span>
						</h1>
						<div
							className="position-relative  overflow-hidden p-5"
							style={{ maxHeight: "500px" }}
						>
							<FlashScore score={gainedScore} />
							<Picture
								pokemon={pokemons[questionIndex ?? 0]}
								revealLevel={revealLevel}
							/>
						</div>
						<div className="card-body">
							<h5 className="card-title">Which pokemon is this?</h5>
							<Answers
								pokemons={pokemons}
								correctAnswer={pokemons[questionIndex ?? 0].name}
								showCorrect={waiting}
								setUserAnswer={setUserAnswer}
							/>
						</div>
					</div>
				</>
			)}
		</>
	);
}
export default App;
