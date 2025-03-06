import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="absolute z-[100] flex flex-col gap-4 px-20 py-10 items-center justify-center bg-black/80 text-white backdrop-blur-md rounded-xl">
        <div className="max-w-md w-full flex-col flex items-center">
          <div className="flex items-center">
            <svg
              className="mr-2 -ml-2 flex stroke-red-600"
              width="2.5rem"
              height="2.5rem"
              viewBox="3 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 8v4m0 4h.01M21 5.63a9 9 0 11-12.728 12.728A9 9 0 0121.364 5.636z"
              />
            </svg>
            <h1 className="text-4xl font-semibold">404</h1>
          </div>
          <p className="text-3xl text-center">
            Oops! The page you are searching for does not exist!
          </p>
        </div>
        <Link
          aria-label="Return Home"
          to="/"
          className="relative rounded-lg text-2xl hover:text-[#f597e8] hover:italic group"
        >
          Return Home
          <span className="absolute left-0 w-full h-[2px] bottom-0 bg-[#f597e8] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
        </Link>
      </div>
    </>
  );
}
