import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <img
        src="PageNotFound.gif"
        alt="Page Not Found"
        className="max-w-[500px] h-auto mb-6"
      />
      <div className="absolute top-0 left-0 right-0 bottom-2 flex flex-col items-center justify-center">
        <p className="text-lg text-red-600 mb-6 pb-12 font-extrabold">
          The page you are looking for does not exist.
        </p>
        <div className="flex space-x-4">
          <a
            href="/"
            className="inline-block px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Go to Home
          </a>
          <button
            onClick={() => navigate(-1)}
            className="inline-block px-6 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
