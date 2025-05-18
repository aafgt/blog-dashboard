// import { NavLink } from "react-router";
// import { getAuthToken } from "../util/auth";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../util/http";
import ProfileDetails from "./ProfileDetails";
import MetricCard from "./MetricCard";
import Posts from "./Posts";
import { PostDetailsInterface } from "../types";
import { RootState } from "../store";

/**
 * This component renders the user's metrics, profile details and posts.
 */
const Dashboard: React.FC = () => {
  // const isAuthenticated = getAuthToken();

  // if (!isAuthenticated) {
  //   return (
  //     <div className="h-full bg-indigo-900 text-white flex flex-col justify-center items-center text-center max-md:w-[calc(100vw-8rem)]">
  //       <h1 className="text-8xl max-md:text-5xl max-sm:text-4xl font-bold">Unauthorized!</h1>
  //       <p className="text-3xl max-md:text-xl">Please login or signup if you don't have an account to access the dashboard.</p>

  //       <NavLink to="/" className="bg-indigo-500 px-5 py-2 rounded-md uppercase my-5 hover:cursor-pointer hover:bg-indigo-400">
  //         Login/Signup
  //       </NavLink>
  //     </div>
  //   );
  // }

  const auth = useSelector((state: RootState) => state.auth);

  const { data: blogPosts, isFetching, isError, error } = useQuery<PostDetailsInterface[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000
  })

  if (isError) {
    return <p>{error.message ?? "An error occurred."}</p>
  }

  const userBlogPosts = blogPosts?.filter((post) => post.username === auth?.user?.username);

  return (
    <div className="h-full">
      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-5">
        {isFetching ? <p>Loading...</p> : <MetricCard title="Total Posts" value={userBlogPosts?.length ?? 0} />}
        <MetricCard title="..." value={0} />
        <MetricCard title="..." value={0} />
      </div>

      <ProfileDetails />

      <h3 className="mt-10 mb-3 font-bold text-3xl">Your Posts</h3>
      {auth?.user?.username && <Posts username={auth?.user?.username} />}
    </div>
  )
}

export default Dashboard;