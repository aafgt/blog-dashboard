import { render, screen, waitFor } from "@testing-library/react"
import Post from "./Post"
import { BrowserRouter } from "react-router";
import Posts from "./Posts";
import { PostInterface } from "../types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { MockedFunction } from "vitest";

const renderWithQueryClient = (ui: React.ReactElement) => {
    const queryClient = new QueryClient();
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe("Posts", () => {
    const postsProps: PostInterface[] = [
        {
            id: 1,
            content: "Some content",
            date: new Date().toISOString(),
            postImage: "",
            title: "Test Post"
        },
        {
            id: 2,
            content: "Some content 2",
            date: new Date().toISOString(),
            postImage: "",
            title: "Test Post 2"
        }
    ]

    // beforeEach(() => {
    //     render(<BrowserRouter><Posts /></BrowserRouter>);
    //     // globalThis.fetch = vi.fn() as MockedFunction<typeof fetch>;
    // });

    it("should display posts", async () => {
        // vi.mock("./Post", () => ({
        //     default: vi.fn(({ title }) => <div>{title}</div>),
        // }));

        // globalThis.fetch.mockResolvedValueOnce({})
        vi.fn().mockResolvedValueOnce({
            json: async () => (postsProps)
        })

        // should use tanstackQuery not fetch....

        renderWithQueryClient(<BrowserRouter><Posts /></BrowserRouter>);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        await waitFor(() => {
            // expect(screen.getByText("Test Post")).toBeInTheDocument();
            // expect(screen.getByText("Test Post 2")).toBeInTheDocument();
        });

        expect(Post).toHaveBeenCalledTimes(2);
        expect(Post).toHaveBeenCalledWith(expect.objectContaining({ title: "Test Post" }), {});
        expect(Post).toHaveBeenCalledWith(expect.objectContaining({ title: "Test Post 2" }), {});
    })
})