"use client";
import { type Movie, type SavedMovie } from "@/types";
import Link from "next/link"

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
      <td className="py-4 px-6">{row.title}</td>
      <td className="py-4 px-6">{row.released}</td>
      <td className="py-4 px-6">{row.genre}</td>
      <td className="py-4 px-6">{row.rating}/10</td>
      <td className="py-4 px-6 space-x-2 flex items-center">
        <Link href={`/movie/${row.id}`}>🖋</Link>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => onRemoveMovie(row.id)}
        >
          ❌
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="overflow-y-auto h-[400px]">
      <table className="min-w-[800px] mb-16">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-4 px-6">Title</th>
            <th className="py-4 px-6">Released</th>
            <th className="py-4 px-6">Genre</th>
            <th className="py-4 px-6">Rating</th>
            <th className="py-4 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
