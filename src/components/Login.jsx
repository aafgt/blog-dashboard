import { useDebugValue, useEffect, useState } from "react";
import Input from "./UI/Input";
import { NavLink, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { login, signup } from "../util/http";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { getAuthToken } from "../util/auth";

const validName = (input) => {
    return /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(input);
}

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const { mutate: signupMutate, isError: signupIsError, error: signupError } = useMutation({
        mutationFn: signup,
        onSuccess: (data) => {
            dispatch(authActions.login(data));
            navigate("blog/dashboard");
        }
    })

    const { mutate: loginMutate, isError: loginIsError, error: loginError } = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            dispatch(authActions.login(data));
            navigate("blog/dashboard");
        }
    })

    const handleLoginSignup = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const userData = Object.fromEntries(fd.entries());

        if (mode === "login") {
            loginMutate(userData);
        }
        else if (mode === "signup") {

            if (userData.password !== userData["confirm-password"]) {
                alert("Passwords do not match.");
                return;
            }

            if (!validName(userData.name)) {
                alert("Please enter a valid name.");
                return;
            }

            if (!userData.username.trim()) {
                alert("Username cannot be empty.");
                return;
            }

            delete userData["confirm-password"];
            userData.profileImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfnVRTgNkeGxX-jYv4Ld7lDbec10HDXcrRvA&s";
            userData.joinDate = new Date();

            signupMutate(userData);
        }

        // mode === "login" ? loginMutate(userData) : signupMutate(userData);
    }

    return (
        <div className="flex-auto flex justify-center items-center">
            <form onSubmit={handleLoginSignup} className="bg-indigo-950 text-white p-10 space-y-5 my-3 rounded-2xl min-w-2/5 max-lg:w-1/2 max-md:w-full max-md:mx-32 max-sm:mx-5 font-bold">
                <h2 className="uppercase text-2xl">{mode}</h2>

                {mode === "login" && loginIsError && <p className="text-red-600">{loginError.info}</p>}
                {mode === "signup" && signupIsError && <p className="text-red-600">{signupError.info}</p>}

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
                    <button className="bg-indigo-500 px-5 py-2 rounded-md uppercase hover:cursor-pointer hover:bg-indigo-400">{mode}</button>
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