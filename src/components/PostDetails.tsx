import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { fetchPost } from "../util/http";
import { formattedDateTime } from "../util/util";

const PostDetails: React.FC = () => {
    const params = useParams();

    const { data: post, isPending, isError, error } = useQuery({
        queryKey: ["posts", { postId: params.postId }],
        queryFn: ({ signal, queryKey }) => {
            const queryParams = queryKey[1] && typeof queryKey[1] === "object" ? { postId: Number(queryKey[1].postId) } : { postId: -1 };
            return fetchPost({ signal, ...queryParams });
        },
        staleTime: 5 * 60 * 1000
    })

    if (isError) {
        return <p>{error.message ?? "An error occurred. Failed to load post details."}</p>
    }

    if (isPending) {
        return <p>Loading...</p>
    }

    return (
        // w-[calc(100vw-13rem)]
        <div className="bg-white text-black rounded-lg shadow-lg p-3 h-full flex flex-col">
            <img src={post?.postImage ?? null} alt="Post image" className="object-fill w-full h-56 rounded-lg" />

            <h3 className="mb-3 font-bold text-3xl text-indigo-700 wrap-anywhere">{post?.title}</h3>

            <p className="wrap-anywhere flex-auto">{post?.content}</p>

            <div className="flex flex-col items-end text-gray-600 mt-3">
                <p>@{post?.username || "Anonymous"}</p>
                <p>{formattedDateTime(post?.date)}</p>
            </div>
        </div>
    )
}

export default PostDetails;