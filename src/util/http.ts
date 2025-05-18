import { QueryClient } from "@tanstack/react-query";
import { UserInterface } from "../types";
// import { redirect } from "react-router";

export interface loginData {
    email: string;
    password: string;
}

export interface signupData extends loginData {
    name: string;
    username: string;
    profileImage: string;
    joinDate: string;
}

export interface postData {
    postImage: string;
    title: string;
    content: string;
    date: string;
}

export interface newPostData extends postData {
    username: string;
}

interface editUserData {
    userId: number;
    userData: {
        profileImage: string;
    }
}

interface editPost {
    postId: string;
    postData: postData;
}

export class customError extends Error {
    code: number;
    info: object;

    constructor(message: string, code: number, info: object) {
        super(message);
        this.code = code;
        this.info = info;
    }
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const queryClient = new QueryClient();

export const signup = async (signupData: signupData) => {
    const response = await fetch(API_URL + "/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signupData)
    })

    if (!response.ok) {
        const error = new Error("An error occurred... Failed to signup.") as customError;
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();
    const token = data.accessToken;

    localStorage.setItem("token", token);

    const users: UserInterface[] = await fetchUsers();
    const user = users.find((user) => user.email === signupData.email);

    if (!user) {
        const error = new Error("An error occurred... Failed to signup.") as customError;
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    localStorage.setItem("userId", String(user?.id));

    return user;
}

export const login = async (loginData: loginData) => {
    const response = await fetch(API_URL + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })

    if (!response.ok) {
        const error = new Error("An error occurred... Failed to login.") as customError;
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();
    const token = data.accessToken;

    localStorage.setItem("token", token);

    const users: UserInterface[] = await fetchUsers();
    const user = users.find((user) => user.email === loginData.email);

    if (!user) {
        const error = new Error("An error occurred... Failed to login.") as customError;
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    localStorage.setItem("userId", String(user?.id));

    return user;
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // return redirect("/");
}

export const createPost = async (postData: newPostData) => {
    const response = await fetch(API_URL + "/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    })

    if (!response.ok) {
        const error = new Error("An error occurred... Failed to create post.") as customError;
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();

    return data;
}

export const fetchPosts = async ({ signal }: { signal: AbortSignal }) => {
    const response = await fetch(API_URL + "/posts", { signal: signal });

    if (!response.ok) {
        const error = new Error("An error occurred... Failed to load posts.") as customError;
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();

    return data;
}

export const fetchPost = async ({ signal, postId }: { signal: AbortSignal, postId: number }) => {
    const response = await fetch(API_URL + `/posts/${postId}`, { signal: signal });

    if (!response.ok) {
        const error = new Error("An error occurred... Failed to load post details.") as customError;
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();

    return data;
}

export const fetchUsers = async () => {
    const response = await fetch(API_URL + "/users");

    if (!response.ok) {
        const error = new Error("An error occurred...") as customError;
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();

    return data;
}

export const fetchUser = async ({ signal, userId }: { signal: AbortSignal, userId: number }) => {
    const response = await fetch(API_URL + `/users/${userId}`, { signal: signal });

    if (!response.ok) {
        const error = new Error("An error occurred...") as customError;
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();

    return data;
}

export const deletePost = async (postId: number) => {
    const response = await fetch(API_URL + `/posts/${postId}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        const error = new Error("An error occurred... Failed to delete post.") as customError;
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();

    return data;
}

export const editPost = async ({ postId, postData }: editPost) => {
    const response = await fetch(API_URL + `/posts/${postId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        const error = new Error("An error occurred... Failed to edit post.") as customError;
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();

    return data;
}

export const editUser = async ({ userId, userData }: editUserData) => {
    const response = await fetch(API_URL + `/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const error = new Error("An error occurred...") as customError;
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();

    return data;
}