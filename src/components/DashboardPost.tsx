import { Link } from "react-router";
import { formattedDateTime } from "../util/util";
import DeleteIcon from "./Icons/DeleteIcon";
import EditIcon from "./Icons/EditIcon";
import { useMutation } from "@tanstack/react-query";
import { deletePost, queryClient } from "../util/http";
import { PostInterface } from "../types";

interface DashboardPostProps {
    post: PostInterface;
}

/**
 * This component renders a post card with edit and delete buttons.
 */
const DashboardPost: React.FC<DashboardPostProps> = ({ post }) => {

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            alert("Post deleted successfully.");
        }
    })

    const handleDelete = (postId: number, postTitle: string) => {
        const confirm = window.confirm(`"${postTitle}"\n Are you sure you want to delete this post?`);

        if (!confirm) {
            return;
        }

        mutate(postId);
    }

    if (isError) {
        alert(`${error.message ?? "An error occurred. Failed to delete post."}`);
    }

    if (isPending) {
        return <p>Loading...</p>
    }

    return (
        <div className="relative">
            <Link to={"/blog/posts/" + (post.id).toString()} className="bg-white text-indigo-700 font-bold text-3xl rounded-lg shadow-lg p-4 min-h-48 flex flex-col pt-12">
                <img src={post?.postImage ?? null} alt="Post image" className="object-fill w-full h-56 rounded-lg" />

                <span className="flex-auto wrap-anywhere">{post.title}</span>
                <span className="text-gray-600 text-sm">{formattedDateTime(post.date)}</span>
                <span className="text-black text-xs overflow-clip h-12 mt-2">{post.content}</span>
            </Link>
            <button type="button" className="absolute top-1 right-1 hover:cursor-pointer hover:bg-red-950 rounded-full p-1" onClick={() => handleDelete(post.id, post.title)}><DeleteIcon /></button>
            <Link to={"/blog/edit-post/" + (post.id).toString()} className="absolute top-1 right-11 hover:bg-indigo-950 rounded-full p-1">
                <EditIcon />
            </Link>
        </div>
    )
}

export default DashboardPost;