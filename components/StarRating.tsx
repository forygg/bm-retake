import React from 'react';

interface StarRatingProps {
	rating: number;
	editable: boolean;
	onRatingChange: (newRating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
	const stars = Array.from({ length: 5 }, (_, index) => index + 1);

	return (
		<div className="flex items-center">
			{stars.map((star) => (
				<button
					key={star}
					onClick={() => onRatingChange(star)}
					className={`text-5xl ${
						star <= rating ? 'text-yellow-400' : 'text-gray-400'
					} cursor-pointer`}
				>
					{star <= rating ? '★' : '☆'}
				</button>
			))}
		</div>
	);
};

export default StarRating;
