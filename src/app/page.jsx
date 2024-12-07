"use client";
import Sidebar from "./components/Sidebar";
import { useQuery, gql } from "@apollo/client";
import FeaturedSection from "./components/FeaturedSection";
import HindiMovies from "./components/HindiMovies";
import EnglishMovies from "./components/EnglishMovies";
import HindiActionMovies from "./components/HindiActionMovies";
import AdventureMovies from "./components/AdventureMovies";
import RecentMovies from "./components/RecentMovies";
import ComedyMovies from "./components/ComedyMovies";
import ActionMovies from "./components/ActionMovies";
import Footer from "./components/Footer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// GraphQL queries
const GET_FEATURED_VIDEO = gql`
  query GetFeaturedVideo {
    getFeaturedVideo {
      id
      title
      description
      synopsis
      genres
      trailerUrl
      thumbnail
      country
      language
      awards
      productionCompanies
      tags
      dateAdded
      featured
      continueWatching
      releaseDate
      director
      mainCast
      duration
      rating
    }
  }
`;

const GET_MOVIES = gql`
  query GetMovies {
    getMovies {
      id
      title
      description
      synopsis
      genres
      trailerUrl
      thumbnail
      country
      language
      awards
      productionCompanies
      tags
      dateAdded
      featured
      continueWatching
      releaseDate
      director
      mainCast
      duration
      rating
    }
  }
`;

const Home = () => {
  const {
    loading: loadingFeatured,
    data: featuredData,
    error: featuredError,
  } = useQuery(GET_FEATURED_VIDEO);
  const {
    loading: loadingMovies,
    data: moviesData,
    error: movieError,
  } = useQuery(GET_MOVIES);

  if (featuredError || movieError) {
    // Log the error to the console for debugging purposes
    console.error("Error fetching movies:", featuredError || movieError);
  }

  // Filter Hindi movies
  const hindiMovies = moviesData?.getMovies
    ?.filter((movie) => movie.language?.includes("Hindi"))
    .reverse();

  // Filter English movies
  const englishMovies = moviesData?.getMovies?.filter((movie) =>
    movie.language?.includes("English")
  );

  // Filter Action movies
  const actionMovies = moviesData?.getMovies?.filter((movie) =>
    movie.genres?.includes("Action")
  );

  // Filter by Hindi Action movies
  const hindiActionMovies = hindiMovies?.filter((movie) =>
    movie.genres?.includes("Action")
  );

  // Filter Comedy movies
  const comedyMovies = moviesData?.getMovies?.filter((movie) =>
    movie.genres?.includes("Comedy")
  );

  // Filter Adventure movies
  const adventureMovies = moviesData?.getMovies?.filter((movie) =>
    movie.genres?.includes("Adventure")
  );
  
   // Filter by Release Date (last year)
   const recentMovies = moviesData?.getMovies?.filter((movie) =>
    new Date(movie.releaseDate) > new Date(new Date().setFullYear(new Date().getFullYear() - 1))
  );


  return (
    <SkeletonTheme baseColor="#2d2d2d" highlightColor="#3c3c3c">
      <div className="min-h-screen bg-black text-white">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 lg:ml-24">
          {loadingFeatured ? (
            // Skeleton for FeaturedSection
            <div className="mb-6">
              <Skeleton
                width="100%"
                className="h-[500px] lg:h-[700px] rounded-lg"
              />
            </div>
          ) : (
            <FeaturedSection
              featuredData={featuredData}
              moviesData={moviesData}
            />
          )}

          {loadingMovies ? (
            // Skeleton for HindiMovies section
            <div className="mt-8 px-2">
              <Skeleton height={30} className="rounded-lg mb-4" />
              <div className="flex space-x-4 overflow-x-scroll">
                {[...Array(10)].map((_, index) => (
                  <div key={index}>
                    <Skeleton
                      height="150px"
                      width="220px"
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <HindiMovies moviesData={hindiMovies} />
          )}

          {loadingMovies ? (
            // Skeleton for English Movies section
            <div className="mt-8 px-2">
              <Skeleton height={30} className="rounded-lg mb-4" />
              <div className="flex space-x-4 overflow-x-scroll">
                {[...Array(10)].map((_, index) => (
                  <div key={index}>
                    <Skeleton
                      height="150px"
                      width="220px"
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EnglishMovies moviesData={englishMovies} />
          )}

          {loadingMovies ? (
            // Skeleton for Hindi Action Movies section
            <div className="mt-8 px-2">
              <Skeleton height={30} className="rounded-lg mb-4" />
              <div className="flex space-x-4 overflow-x-scroll">
                {[...Array(10)].map((_, index) => (
                  <div key={index}>
                    <Skeleton
                      height="150px"
                      width="220px"
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <HindiActionMovies moviesData={hindiActionMovies} />
          )}

          {loadingMovies ? (
            // Skeleton for Comedy Movies section
            <div className="mt-8 px-2">
              <Skeleton height={30} className="rounded-lg mb-4" />
              <div className="flex space-x-4 overflow-x-scroll">
                {[...Array(10)].map((_, index) => (
                  <div key={index}>
                    <Skeleton
                      height="150px"
                      width="220px"
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <ComedyMovies moviesData={comedyMovies} />
          )}

          {loadingMovies ? (
            // Skeleton for Recent Movies section
            <div className="mt-8 px-2">
              <Skeleton height={30} className="rounded-lg mb-4" />
              <div className="flex space-x-4 overflow-x-scroll">
                {[...Array(10)].map((_, index) => (
                  <div key={index}>
                    <Skeleton
                      height="150px"
                      width="220px"
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <RecentMovies moviesData={recentMovies} />
          )}

          {loadingMovies ? (
            // Skeleton for Adventure Movies section
            <div className="mt-8 px-2">
              <Skeleton height={30} className="rounded-lg mb-4" />
              <div className="flex space-x-4 overflow-x-scroll">
                {[...Array(10)].map((_, index) => (
                  <div key={index}>
                    <Skeleton
                      height="150px"
                      width="220px"
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <AdventureMovies moviesData={adventureMovies} />
          )}
          {loadingMovies ? (
            // Skeleton for Action Movies section
            <div className="mt-8 px-2">
              <Skeleton height={30} className="rounded-lg mb-4" />
              <div className="flex space-x-4 overflow-x-scroll">
                {[...Array(10)].map((_, index) => (
                  <div key={index}>
                    <Skeleton
                      height="150px"
                      width="220px"
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <ActionMovies moviesData={actionMovies} />
          )}
        </div>
      </div>
      <Footer />
    </SkeletonTheme>
  );
};

export default Home;
