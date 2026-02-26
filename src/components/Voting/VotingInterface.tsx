import React, { useState } from "react";
import { Candidato } from "../../types/index";
import CandidateCard from "./CandidateCard";
import VotingConfirmation from "./VotingConfirmation";

interface VotingInterfaceProps {
	candidates: Candidato[];
	onVoteSubmit: (candidate: Candidato) => Promise<void>;
	loading: boolean;
}

const VotingInterface: React.FC<VotingInterfaceProps> = ({
	candidates,
	onVoteSubmit,
	loading,
}) => {
	const [selectedCandidate, setSelectedCandidate] = useState<Candidato | null>(
		null,
	);
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

	const handleSelectCandidate = (candidate: Candidato) => {
		setSelectedCandidate(candidate);
		setShowConfirmation(true);
	};

	const handleConfirmVote = async () => {
		if (selectedCandidate) {
			await onVoteSubmit(selectedCandidate);
			setSelectedCandidate(null);
			setShowConfirmation(false);
		}
	};

	const handleCancelConfirmation = () => {
		setShowConfirmation(false);
	};

	return (
		<div className="p-6 bg-gradient-to-b from-slate-50 to-white min-h-screen">
			<div className="mb-8 text-center">
				<h1 className="font-playfair text-4xl font-bold text-slate-900 mb-2">
					🗳️ Elige tu Candidato
				</h1>
				<p className="text-slate-600 text-lg">
					Selecciona al líder que quieres que te represente en 2026
				</p>
				<div className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-sm font-bold uppercase tracking-wide">
					Tu Voto = Tu Voz
				</div>
			</div>

			{showConfirmation && selectedCandidate ? (
				<VotingConfirmation
					candidate={selectedCandidate}
					onConfirm={handleConfirmVote}
					onCancel={handleCancelConfirmation}
					loading={loading}
				/>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
					{candidates && candidates.length > 0 ? (
						candidates.map((candidate) => (
							<CandidateCard
								key={candidate.id}
								candidate={candidate}
								onSelect={handleSelectCandidate}
							/>
						))
					) : (
						<div className="col-span-full text-center py-12">
							<p className="text-slate-600 text-lg">
								No hay candidatos disponibles en este momento.
							</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default VotingInterface;
