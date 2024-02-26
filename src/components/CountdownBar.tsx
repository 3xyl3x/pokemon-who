interface CountDownBarProps {
	revealLevel: number;
}

const CountDownBar = (props: CountDownBarProps) => {
	const { revealLevel } = props;

	return (
		<>
			<div className="progress user-select-none" role="progressbar">
				<div
					className="progress-bar progress-bar-striped progress-bar-animated bg-success"
					style={{ width: 100 - revealLevel + "%" }}
				></div>
			</div>
		</>
	);
};

export default CountDownBar;
