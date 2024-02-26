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
							<h5 className="modal-title" id="exampleModalLiveLabel">
								Highscore
							</h5>
						</div>
						<div className="modal-body">
							<h2>YOU GOT {score}</h2>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
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
