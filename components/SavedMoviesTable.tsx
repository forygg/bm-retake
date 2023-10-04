'use client';
import { type Movie, type SavedMovie } from '@/types';
import Link from 'next/link';

export default function UserMoviesTable({
	data,
	onRemoveMovie,
}: {
	data: Movie[] | undefined;
	onRemoveMovie: (movieId: string) => void;
}) {
	const rows = data?.map((row) => (
		<tr
			key={row.id}
			className="transition-all duration-300 hover:bg-gray-100 cursor-pointer"
		>
			<td className="py-2 px-4 md:px-6 text-center">{row.title}</td>
			<td className="py-2 px-4 md:px-6 text-center">{row.released}</td>
			<td className="py-2 px-4 md:px-6 text-center">{row.genre}</td>
			<td className="py-2 px-4 md:px-6 text-center">{row.rating}/10</td>
			<td className="py-2 px-4 md:px-6 flex justify-center items-center h-full">
				<div className="flex items-center h-full">
					<Link href={`/movie/${row.id}`}>🖋</Link>
					<button
						className="text-red-500 hover:text-red-700"
						onClick={() => onRemoveMovie(row.id)}
					>
						❌
					</button>
				</div>
			</td>
		</tr>
	));

	return (
		<div className="overflow-x-auto overflow-y-auto w-full">
			<table className="w-full table-auto">
				<thead className="bg-gray-100">
					<tr>
						<th className="py-2 px-4 md:px-6 text-center">Title</th>
						<th className="py-2 px-4 md:px-6 text-center">Released</th>
						<th className="py-2 px-4 md:px-6 text-center">Genre</th>
						<th className="py-2 px-4 md:px-6 text-center">Rating</th>
						<th className="py-2 px-4 md:px-6 text-center">Actions</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		</div>
	);
}
