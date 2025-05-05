import { QueryClient } from "@tanstack/react-query";
// import { redirect } from "react-router";

const BACKEND_URL = "http://localhost:3000";

export const queryClient = new QueryClient();

export const signup = async (signupData) => {
    const response = await fetch(BACKEND_URL + "/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signupData)
    })

    if (!response.ok) {
        const error = new Error("An error occurred... Failed to signup.");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();
    const token = data.accessToken;

    localStorage.setItem("token", token);

    const users = await fetchUsers();
    const user = users.find((user) => user.email === signupData.email);

    localStorage.setItem("userId", user.id);

    return user;
}

export const login = async (loginData) => {
    const response = await fetch(BACKEND_URL + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })

    if (!response.ok) {
        const error = new Error("An error occurred... Failed to login.");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();
    const token = data.accessToken;

    localStorage.setItem("token", token);

    const users = await fetchUsers();
    const user = users.find((user) => user.email === loginData.email);

    localStorage.setItem("userId", user.id);

    return user;
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // return redirect("/");
}

export const createPost = async (postData) => {
    const response = await fetch(BACKEND_URL + "/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    })

    if (!response.ok) {
        const error = new Error("An error occurred... Failed to create post.");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();

    return data;
}

export const fetchPosts = async ({ signal }) => {
    const response = await fetch(BACKEND_URL + "/posts", { signal: signal });

    if (!response.ok) {
        const error = new Error("An error occurred... Failed to load posts.");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();

    return data;
}

export const fetchPost = async ({ signal, postId }) => {
    const response = await fetch(BACKEND_URL + `/posts/${postId}`, { signal: signal });

    if (!response.ok) {
        const error = new Error("An error occurred... Failed to load post details.");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();

    return data;
}

export const fetchUsers = async () => {
    const response = await fetch(BACKEND_URL + "/users");

    if (!response.ok) {
        const error = new Error("An error occurred...");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();

    return data;
}

export const fetchUser = async ({ signal, userId }) => {
    const response = await fetch(BACKEND_URL + `/users/${userId}`, { signal: signal });

    if (!response.ok) {
        const error = new Error("An error occurred...");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();

    return data;
}

export const deletePost = async (postId) => {
    const response = await fetch(BACKEND_URL + `/posts/${postId}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        const error = new Error("An error occurred... Failed to delete post.");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();

    return data;
}

export const editPost = async ({ postId, postData }) => {
    const response = await fetch(BACKEND_URL + `/posts/${postId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        const error = new Error("An error occurred... Failed to edit post.");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();

    return data;
}

export const editUser = async ({ userId, userData }) => {
    const response = await fetch(BACKEND_URL + `/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const error = new Error("An error occurred...");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();

    return data;
}