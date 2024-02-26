interface PictureProps {
	pokemon: Pokemon;
	revealLevel: number;
}
const Picture = (props: PictureProps) => {
	const { pokemon, revealLevel } = props;

	const pictureStyle = `blur(${33 - revealLevel / 3}px)  grayscale(${
		150 - revealLevel * 1.5
	}%)`;

	return (
		<>
			<img
				src={pokemon.imageURL}
				className="card-img-top img-fluid"
				style={{
					filter: revealLevel !== 100 ? pictureStyle : "",

					maxHeight: "30vh",
				}}
				alt="pokemon"
			/>
		</>
	);
};
export default Picture;
