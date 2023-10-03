import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen mx-14">
      <div className="text-left">
        <h1 className="text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to our film search website! We are passionate about movies and
          want to provide you with the best platform to discover, save, and
          review your favorite films.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Feel free to explore our extensive movie database, add films to your
          library, and share your thoughts by posting reviews. Happy movie
          watching!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
