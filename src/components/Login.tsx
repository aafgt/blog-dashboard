import { useEffect, useState } from "react";
import Input from "./UI/Input";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { customError, login, loginData, signup, signupData } from "../util/http";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { getAuthToken } from "../util/auth";
import { AppDispatch } from "../store";
import { UserInterface } from "../types";
// import { isPending } from "@reduxjs/toolkit";

const validName = (input: string) => {
    return /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(input);
}

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const isAuthenticated = getAuthToken();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/blog/dashboard");
        }
    }, [isAuthenticated]);

    const [mode, setMode] = useState("login");
    const toggleMode = () => {
        mode === "login" ? setMode("signup") : setMode("login");
    }

    const { mutate: signupMutate, isPending: signupIsPending, isError: signupIsError, error: signupError } = useMutation<UserInterface, customError, signupData>({
        mutationFn: signup,
        onSuccess: (data) => {
            dispatch(authActions.login(data));
            navigate("blog/dashboard");
        }
    })

    const { mutate: loginMutate, isPending: loginIsPending, isError: loginIsError, error: loginError } = useMutation<UserInterface, customError, loginData>({
        mutationFn: login,
        onSuccess: (data) => {
            dispatch(authActions.login(data));
            navigate("blog/dashboard");
        }
    })

    const handleLoginSignup = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fd = new FormData(event.currentTarget);
        const userData = Object.fromEntries(fd.entries());

        if (mode === "login") {
            const typedUserData: loginData = {
                email: userData.email as string,
                password: userData.password as string
            }

            loginMutate(typedUserData);
        }
        else if (mode === "signup") {

            if (userData.password !== userData["confirm-password"]) {
                alert("Passwords do not match.");
                return;
            }

            if (typeof userData.name === "string" && !validName(userData.name)) {
                alert("Please enter a valid name.");
                return;
            }

            if (typeof userData.username === "string" && !userData.username.trim()) {
                alert("Username cannot be empty.");
                return;
            }

            delete userData["confirm-password"];
            userData.profileImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfnVRTgNkeGxX-jYv4Ld7lDbec10HDXcrRvA&s";
            userData.joinDate = new Date().toISOString();

            const typedUserData: signupData = {
                email: userData.email as string,
                password: userData.password as string,
                joinDate: userData.joinDate as string,
                name: userData.name as string,
                profileImage: userData.profileImage as string,
                username: userData.username as string
            }

            signupMutate(typedUserData);
        }

        // mode === "login" ? loginMutate(userData) : signupMutate(userData);
    }

    return (
        <div className="flex-auto flex justify-center items-center">
            <form onSubmit={handleLoginSignup} className="bg-indigo-950 text-white p-10 space-y-5 my-3 rounded-2xl min-w-2/5 max-lg:w-1/2 max-md:w-full max-md:mx-32 max-sm:mx-5 font-bold">
                <h2 className="uppercase text-2xl">{mode}</h2>

                {mode === "login" && loginIsError && <p className="text-red-600">{String(loginError?.info ?? "An error occurred... Try again later.")}</p>}
                {mode === "signup" && signupIsError && <p className="text-red-600">{String(signupError?.info ?? "An error occurred... Try again later.")}</p>}

                <Input label="E-Mail" id="email" type="email" />

                {mode === "signup" && <div className="flex gap-5 max-lg:flex-col">
                    <Input label="Name" id="name" type="text" required />
                    <Input label="Username" id="username" type="text" required />
                </div>}

                <div className="flex gap-5 max-lg:flex-col">
                    <Input label="Password" id="password" type="password" />
                    {mode === "signup" && <Input label="Confirm Password" id="confirm-password" type="password" />}
                </div>

                <div className="flex justify-end">
                    {(loginIsPending || signupIsPending) && <p>Loading...</p>}
                    {!(loginIsPending || signupIsPending) && <button className="bg-indigo-500 px-5 py-2 rounded-md uppercase hover:cursor-pointer hover:bg-indigo-400">{mode}</button>}
                </div>

                <div className="space-y-1">
                    <p>{mode === "login" ? "Don't" : "Already"} have an account? <span className="underline font-bold hover:cursor-pointer hover:text-indigo-500" onClick={toggleMode}>{mode === "login" ? "Signup" : "Login"}</span></p>
                    {/* <NavLink to="blog/posts" className="text-sm text-indigo-500 hover:cursor-pointer hover:underline" type="button">Continue without logging in...</NavLink> */}
                </div>
            </form>
        </div>
    )
}

export default Login;