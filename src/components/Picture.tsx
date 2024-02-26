interface PictureProps {
	pokemon: Pokemon;
	revealLevel: number;
}
const Picture = (props: PictureProps) => {
	const { pokemon, revealLevel } = props;

	const pictureStyle = `blur(${90 - revealLevel}px)  grayscale(${
		150 - revealLevel * 1.5
	}%)`;

	return (
		<>
			<img
				src={pokemon.imageURL}
				className="card-img-top img-fluid"
				style={revealLevel !== 100 ? { filter: pictureStyle } : {}}
				alt="pokemon"
			/>
		</>
	);
};
export default Picture;
