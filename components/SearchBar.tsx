'use client';

import { type FormEvent, useState } from 'react';

const SearchBar = ({ onSearch }: { onSearch: (value: string) => void }) => {
	const [searchValue, setSearchValue] = useState('');

	const handleSearch = () => {
		onSearch(searchValue);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		handleSearch();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex items-center space-x-2 max-w-screen-l mx-auto"
		>
			<input
				type="text"
				placeholder="Spider-Man"
				className="border border-gray-300 px-3 py-2 rounded w-full w-max:720"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
			<button
				type="submit"
				className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
			>
				Search
			</button>
		</form>
	);
};

export default SearchBar;
