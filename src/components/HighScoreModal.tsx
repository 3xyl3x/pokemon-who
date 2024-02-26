import React from "react";

interface ModalProps {
	score: number;
	onClose: () => void;
}

const HighScoreModal: React.FC<ModalProps> = ({ score, onClose }) => {
	return (
		<>
			{" "}
			<div
				className="modal fade show"
				role="dialog"
				style={{ display: "block" }}
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h2
								className="modal-title user-select-none"
								id="exampleModalLiveLabel"
							>
								Highscore
							</h2>
						</div>
						<div className="modal-body text-center user-select-none">
							<h2>
								YOU GOT <span className="badge text-bg-success">{score}</span>{" "}
								POINTS!
							</h2>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-warning fw-bold"
								data-bs-dismiss="modal"
								onClick={onClose}
							>
								Restart game
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HighScoreModal;
