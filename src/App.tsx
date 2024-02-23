import { useEffect, useState } from "react";
import { getPokemons } from "./services/service";

function App() {
	const [pokemons, setPokemons] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const pokemonData = await getPokemons();
			setPokemons(pokemonData);
			console.log(pokemonData);
		};
		fetchData();
	}, []);

	return (
		<>
			{pokemons && pokemons.length > 0 ? (
				pokemons.map((pokemon, index: number) => (
					<div key={index}>
						<p>{pokemon.name}</p>
						<img
							alt="pokemon"
							src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
						/>
					</div>
				))
			) : (
				<p>No Pokemon data available</p>
			)}
		</>
	);
}

export default App;
