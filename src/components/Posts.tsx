import { useQuery } from "@tanstack/react-query";
// import { useSelector } from "react-redux";
import { fetchPosts } from "../util/http";
import Post from "./Post";
import DashboardPost from "./DashboardPost";
import React, { useState } from "react";
import { getPaginationRange2 } from "../util/util";

import { PostDetailsInterface } from "../types";

interface PostsProps {
  username?: string;
}

const ITEMS_PER_PAGE = 4;

/**
 * This component renders Post's cards with pagination and 
 * DashboardPost's cards with pagination and edit and delete buttons for the user's posts .
 */
const Posts: React.FC<PostsProps> = ({ username }) => {
  const [page, setPage] = useState(1);
  // const blogPosts = useSelector((state) => state.blog.posts);

  const { data: blogPosts, isPending, isError, error } = useQuery<PostDetailsInterface[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000
  })

  if (isError) {
    return <p>{error.message ?? "An error occurred. Failed to load posts."}</p>
  }

  if (isPending) {
    return <p>Loading...</p>
  }

  const totalPages = Math.ceil(blogPosts?.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedBlogPosts = blogPosts?.slice(start, end);
  const paginationRange = getPaginationRange2(page, totalPages);

  if (username) {
    const userBlogPosts = blogPosts?.filter((post: PostDetailsInterface) => post.username === username);

    const userTotalPages = Math.ceil(userBlogPosts?.length / ITEMS_PER_PAGE);
    const userPaginatedBlogPosts = userBlogPosts?.slice(start, end);
    const userPaginationRange = getPaginationRange2(page, userTotalPages);

    return (
      <>
        {userBlogPosts?.length > 0 &&
          <>
            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
              {userPaginatedBlogPosts?.map((post: PostDetailsInterface) => (
                <DashboardPost key={post.id} post={post} />
              ))}
            </div>

            <div className="flex justify-end items-center gap-5 mt-4">
              <button type="button" className="bg-indigo-500 sm:px-5 sm:py-2 rounded-md uppercase hover:cursor-pointer hover:bg-indigo-400 disabled:bg-indigo-950 disabled:cursor-default max-sm:size-3.5 max-sm:text-xs flex justify-center items-center" disabled={page === 1} onClick={() => setPage(p => p - 1)}>{"<"}</button>

              {userPaginationRange?.map((pg, index) => (
                pg === "..." ? (
                  <span key={index}>...</span>
                ) : (
                  <button key={index} type="button" className={`sm:px-5 sm:py-2 rounded-md uppercase hover:cursor-pointer hover:bg-indigo-400 max-sm:size-3.5 max-sm:text-xs flex justify-center items-center ${pg === page ? "bg-black" : "bg-indigo-500"}`} onClick={() => setPage(pg as number)}>
                    {pg}
                  </button>
                )
              ))}

              <button type="button" className="bg-indigo-500 sm:px-5 sm:py-2 rounded-md uppercase hover:cursor-pointer hover:bg-indigo-400 disabled:bg-indigo-950 disabled:cursor-default max-sm:size-3.5 max-sm:text-xs flex justify-center items-center" disabled={end >= userBlogPosts?.length} onClick={() => setPage(p => p + 1)}>{">"}</button>
            </div>
          </>
        }

        {userBlogPosts?.length <= 0 && <p className="mt-5 font-bold text-2xl">You don't have any posts yet... Try creating a new post from the sidebar.</p>}
      </>
    )
  }

  return (
    <>
      {blogPosts?.length > 0 &&
        <>
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
            {paginatedBlogPosts?.map((post: PostDetailsInterface) => (
              <Post key={post.id} post={post} />
            ))}
          </div>

          <div className="flex justify-end items-center gap-5 mt-4">
            <button type="button" className="bg-indigo-500 sm:px-5 sm:py-2 rounded-md uppercase hover:cursor-pointer hover:bg-indigo-400 disabled:bg-indigo-950 disabled:cursor-default max-sm:size-3.5 max-sm:text-xs flex justify-center items-center" disabled={page === 1} onClick={() => setPage(p => p - 1)}>{"<"}</button>

            {paginationRange?.map((pg, index) => (
              pg === "..." ? (
                <span key={index}>...</span>
              ) : (
                <button key={index} type="button" className={`sm:px-5 sm:py-2 rounded-md uppercase hover:cursor-pointer hover:bg-indigo-400 max-sm:size-3.5 max-sm:text-xs flex justify-center items-center ${pg === page ? "bg-black" : "bg-indigo-500"}`} onClick={() => setPage(pg as number)}>
                  {pg}
                </button>
              )
            ))}

            <button type="button" className="bg-indigo-500 sm:px-5 sm:py-2 rounded-md uppercase hover:cursor-pointer hover:bg-indigo-400 disabled:bg-indigo-950 disabled:cursor-default max-sm:size-3.5 max-sm:text-xs flex justify-center items-center" disabled={end >= blogPosts?.length} onClick={() => setPage(p => p + 1)}>{">"}</button>
          </div>
        </>
      }

      {blogPosts?.length <= 0 && <p className="mt-5 font-bold text-2xl">There are no posts yet... Try creating a new post from the sidebar.</p>}
    </>
  )
}

export default Posts;