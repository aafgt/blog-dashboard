import { useMutation, useQuery } from "@tanstack/react-query";
import Input from "./UI/Input";
import { editPost, fetchPost, queryClient } from "../util/http";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router";
// import { useSelector } from "react-redux";

const EditPostForm = () => {

    const params = useParams();
    const navigate = useNavigate();
    // const auth = useSelector((state) => state.auth);

    const { data: post } = useQuery({
        queryKey: ["posts", { postId: params.postId }],
        queryFn: ({ signal, queryKey }) => fetchPost({ signal, ...queryKey[1] }),
        staleTime: 5 * 60 * 1000
    })

    const formRef = useRef();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: editPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            formRef?.current?.reset();
            alert("Post updated successfully.");
            navigate("/blog/dashboard");
        }
    })

    const handleEditPost = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        let postData = Object.fromEntries(fd.entries());

        if (!postData.title.trim() || !postData.content.trim()) {
            alert("Title and Content cannot be empty. Please add a title and content.");
            return;
        }

        if (!postData.postImage.trim()) {
            postData.postImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAACUCAMAAAB4Mk+VAAAAMFBMVEXp7vG6vsHt8vW3u77m6+7Q1dji5+rHzM/d4uXDyMrW2t3Y3eC+wsXM0dS0uLvT2NouUdAmAAADUklEQVR4nO2cgXKzKhBGZQGjAsn7v+2vQXMNgmmuMLLmO9NpJp0YPAXZBZGmAQAAAAAAAAAAAAAAAAAAAAAAANJQKc4W22M8u7YQqqlXnVrX21L0WtUpTqSlFOWQdqhRnFRf0noSl/psyRjuXlZ7MjdnS27pCtf207tXZ2tuuHlvWYhZ/HG2Zoiaq6S/lcHOFX62ZwDNzdyqQnTe21bW0Gdv6UqFGup9e6rUW8M7cwHwromENzW5hhOsvFXbjagcAwo+3qSMj7q96zIUwMWbupt4plljsmXd4Srn4k3GrhL2MbE+KM7Em9r3YYq8HS2Ah3djw6HUwQjHw5sem1GpPHbGPLxVWN1C3I+l7iy8yWy0hRQ/4K0jky/3T95Dt/MJxt4fTnkQtk2LX9V7jPfTrEJSnIf3tjsfvXePN1NPKNM1zsO72/bnYq9fWzrCtDgL72gc20lcyCztIynOwztyge/kLWT+u+WQEmfi3dhAXD7SXZZZf1b2UXEe3uO4RLyJ74xL3rVT4ky8w3HoLR2hNrldVJyLt5938B7S6vTpmm0XGBNn4+3nmaZbW73ummRYHmIRL9K58fF+rvroOtOppPWoHbGOijPy/sNRkXHbIh4MUq7kHfbkezV+Ie91uvKxxq/jva8dil/GO31tv8T7lfhlvKMBLF3jLL1JPcK4lAhgSXGW3o0Le6lIlhYVF8v/i6W3FtPKl9XF+kftVThj6E3aK7zStr24vRX3DYWfN70WMi5V9yGABRie3qRflr7NfqnN1JvWy1Yn8W8aOWPvt4m2qZcavl3HytLbhbfB9V97csbe1OhvJS/hnUWboXcWbXbe5LJoc/OO3hO9vvcqXfkp72zarLxVrkbOyzt63/8XvN2Pemds5vCGdz3A+/kO3vD+BW93z/ckMCdv47Qef56/1q/O+bfaLX92wav/2Pqo1hfAwXtM0PMxF8DDO38B8K4JeJcqoG7vW3qt2rHvX1Z2V+bdzM8HSjcUwfjtQqrb36HZLLwuQrn9I/4vWaeW0mR4ojozxbdnElN1n225hTpRWnzncaMTobbwJX4//BB5GUg5W2x/JinsUOuOe9S0RhfiYVSt2hPFtpWsWRoAAAAAAAAAAAAAAAAAAAAAAMD5/AND/jzIgOiOuQAAAABJRU5ErkJggg==";
        }

        postData = { ...postData, date: new Date() }

        mutate({ postId: params.postId, postData });
    }

    if (isPending) {
        return <p>Loading...</p>
    }

    return (
        <>
            {isError && <p className="text-red-600">{error.message ?? "An error occurred. Failed to edit post."}</p>}
            <form onSubmit={handleEditPost} ref={formRef} className="space-y-5">
                <Input label="Post image URL" id="postImage" type="text" defaultValue={post?.postImage} />

                <Input label="Title" id="title" type="text" defaultValue={post?.title} />

                <div className="flex flex-col w-full">
                    <label className="text-2xl" htmlFor="content">Content</label>
                    <textarea id="content" name="content" rows={10} defaultValue={post?.content} className="bg-indigo-500 rounded-md p-2 text-xl" />
                </div>

                <div className="flex justify-end gap-5">
                    <button type="button" className="uppercase hover:cursor-pointer" onClick={() => navigate("/blog/dashboard")}>Cancel</button>
                    <button className="bg-indigo-500 px-5 py-2 rounded-md uppercase hover:cursor-pointer hover:bg-indigo-400">Edit Post</button>
                </div>
            </form>
        </>
    )
}

export default EditPostForm;