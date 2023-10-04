import Link from 'next/link';

const Footer = () => (
	<footer className="flex flex-col text-black-100 border-t border-gray-100 mt-auto">
		<div className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10">
			<p>@2023 MovieHub. All rights reserved</p>
			<Link href="/about">About</Link>
		</div>
	</footer>
);

export default Footer;
