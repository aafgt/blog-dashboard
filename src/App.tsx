import { createBrowserRouter, RouterProvider } from "react-router"
import Login from "./components/Login"
import RootLayout from "./pages/RootLayout"
import DashboardLayout from "./pages/DashboardLayout"
import Dashboard from "./components/Dashboard"
import Posts from "./components/Posts"
import Err from "./components/Err"
import PostDetails from "./components/PostDetails"
import PostForm from "./components/PostForm"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./util/http"
import EditPostForm from "./components/EditPostForm"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Err />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: "blog",
        element: <DashboardLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "posts",
            element: <Posts />,
          },
          {
            path: "posts/:postId",
            element: <PostDetails />
          },
          {
            path: "new-post",
            element: <PostForm />
          },
          {
            path: "edit-post/:postId",
            element: <EditPostForm />
          }
        ]
      }
    ]
  }
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
