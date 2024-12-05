"use client";
import Sidebar from "./components/Sidebar";
import { useQuery, gql } from "@apollo/client";
import FeaturedSection from "./components/FeaturedSection";
import HindiMovies from "./components/HindiMovies";
import EnglishMovies from "./components/EnglishMovies";
import Footer from "./components/Footer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import { isAuthenticated } from "./utils/auth";
import { useRouter } from "next/router";

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

  // Error handling
  if (featuredError || movieError) {
    return <div>Error: {featuredError?.message || movieError?.message}</div>;
  }

  // Filter Hindi movies
  const hindiMovies = moviesData?.getMovies?.filter((movie) =>
    movie.language?.includes("Hindi")
  ).reverse();

  // Filter Hindi movies
  const englishMovies = moviesData?.getMovies?.filter((movie) =>
    movie.language?.includes("English")
  );

  // const router = useRouter();

  // useEffect(() => {
  //   if (!isAuthenticated()) {
  //     router.push("/login");
  //   }
  // }, [router]);

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
            <Skeleton height="700px" width="100%" className="rounded-lg" />
          </div>
        ) : (
          <FeaturedSection
            featuredData={featuredData}
            moviesData={moviesData}
          />
        )}

        {loadingMovies ? (
          // Skeleton for HindiMovies section
          <div className="mt-6">
            <Skeleton height={30} width="12%" className="rounded-lg mb-4" />
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
          <div className="mt-6">
            <Skeleton height={30} width="12%" className="rounded-lg mb-4" />
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
      </div>
      </div>
      <Footer />
    </SkeletonTheme>
  );
};

export default Home;
