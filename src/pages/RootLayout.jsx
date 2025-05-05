import { useIsFetching } from "@tanstack/react-query";
import { Outlet } from "react-router";

const RootLayout = () => {
    const fetching = useIsFetching();

    return (
        <div className="min-h-screen bg-indigo-900 text-white flex flex-col">
            <div className="bg-indigo-500 rounded-lg">{fetching > 0 && <progress />}</div>
            <header className="bg-indigo-950 h-16 px-5 flex items-center font-bold sticky top-0 z-50">
                <h1 className="hover:cursor-pointer">BLOG DASHBOARD</h1>
            </header>
            <Outlet />
        </div>
    )
}

export default RootLayout;