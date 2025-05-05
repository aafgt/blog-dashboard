import { NavLink, useRouteError } from "react-router";

const Err = () => {
  const error = useRouteError();

  let title = "Error";
  let message = "An error has occurred...";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <div className="min-h-screen bg-indigo-900 text-white flex flex-col justify-center items-center text-center">
      <h1 className="text-8xl max-md:text-5xl max-sm:text-4xl font-bold">{title}</h1>
      <p className="text-3xl max-md:text-xl">{message}</p>

      <NavLink to="/blog/posts" className="bg-indigo-500 px-5 py-2 rounded-md uppercase my-5 hover:cursor-pointer hover:bg-indigo-400">
        Go to Posts
      </NavLink>
    </div>
  )
}

export default Err;