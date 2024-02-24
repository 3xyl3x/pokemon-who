interface PictureProps {
	pokemon: Pokemon;
	revealLevel: number;
}
const Picture = (props: PictureProps) => {
	const { pokemon, revealLevel } = props;
	const pictureStyle = {
		filter: `blur(${100 - revealLevel}px) grayscale(${100 - revealLevel}%)`, // Apply blur based on revealLevel
		//backgroundColor: `hsl(240, 100%, ${100 - revealLevel}%)`, // Apply color based on revealLevel
	};

	return (
		<>
			<h4>{`blur(${100 - revealLevel}px) grayscale(${100 - revealLevel}%)`}</h4>
			<img src={pokemon.imageURL} style={pictureStyle} width="400px" />
		</>
	);
};
export default Picture;
