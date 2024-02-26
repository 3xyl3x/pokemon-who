import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=100";

const getPokemons = async () => {
	const response = await axios.get(API_URL);
	const pokemons: Pokemon[] = [];
	response.data.results.forEach((element: { name: string }) => {
		const pokemon: Pokemon = {
			name: element.name,
			imageURL: `https://img.pokemondb.net/artwork/large/${element.name}.jpg`,
		};
		pokemons.push(pokemon);
	});
	return pokemons;
};

export default getPokemons;
