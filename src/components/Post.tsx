import { Link } from "react-router";
import { formattedDateTime } from "../util/util";

import { PostInterface } from "../types";

interface PostProps {
  post: PostInterface;
}

/**
 * This component renders a post card.
 */
const Post: React.FC<PostProps> = ({ post }) => {
    return (
        <Link to={(post.id).toString()} className="bg-white text-indigo-700 font-bold text-3xl rounded-lg shadow-lg p-4 min-h-48 flex flex-col">
            <img src={post?.postImage ?? null} alt="Post image" className="object-fill w-full h-56 rounded-lg" />

            <span className="flex-auto wrap-anywhere">{post.title}</span>
            <span className="text-gray-600 text-sm">{formattedDateTime(post.date)}</span>
            <span className="text-black text-xs overflow-clip h-12 mt-2">{post.content}</span>
        </Link>
    )
}

export default Post;