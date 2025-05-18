import { act, render, screen } from "@testing-library/react"
import EditPostForm from "./EditPostForm";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "../store";
import userEvent from '@testing-library/user-event'

import * as http from "../util/http";
import { MemoryRouter } from "react-router";

const renderWithQueryClient = (ui: React.ReactElement) => {
    const queryClient = new QueryClient();
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe("EditPostForm", () => {

    // beforeEach(() => {
    //     renderWithQueryClient(<Provider store={store}><MemoryRouter><EditPostForm /></MemoryRouter></Provider>);
    // })

    it("should have image, title and content inputs", () => {
        renderWithQueryClient(<Provider store={store}><MemoryRouter><EditPostForm /></MemoryRouter></Provider>);

        const inputs = screen.getAllByRole("textbox");

        expect(inputs).toHaveLength(3);
    })


    it.skip("should load image, title and content of the post in the inputs", async () => {
        const getPostSpy = vi.spyOn(http, "fetchPost");
        getPostSpy.mockResolvedValueOnce({
            postImage: "",
            title: "Title 1",
            content: "content 1"
        });

        await act(async () => {
            renderWithQueryClient(<Provider store={store}><MemoryRouter><EditPostForm /></MemoryRouter></Provider>);
        })

        const inputs = screen.getAllByRole("textbox");

        // const hookResult = renderHook(() => { useParams(); });
        // hookResult.result.current.params.postId;

        expect(inputs).toHaveLength(3);
        expect(inputs[1]).toHaveValue("Title 1");
        expect(inputs[2]).toHaveValue("content 1");
    })

    it.skip("should navigate back when cancel button is clicked", async () => {
        const mockedNavigate = vi.fn();
        vi.mock("react-router-dom", () => ({
            ...vi.importActual("react-router-dom"),
            useNavigate: () => mockedNavigate,
        }));

        renderWithQueryClient(<Provider store={store}><MemoryRouter><EditPostForm /></MemoryRouter></Provider>);

        const user = userEvent.setup();
        const button = screen.getAllByRole("button");
        await user.click(button[0]);

        expect(mockedNavigate).toHaveBeenCalledWith("/blog/dashboard");
    })

    it("should alert empty if post submitted with title or content empty", async () => {
        renderWithQueryClient(<Provider store={store}><MemoryRouter><EditPostForm /></MemoryRouter></Provider>);

        const user = userEvent.setup();

        const alertMock = vi.spyOn(window, "alert").mockImplementation(() => { return "Title and Content cannot be empty. Please add a title and content." });

        const button = screen.getAllByRole("button");
        await user.click(button[1]);

        expect(alertMock).toHaveBeenCalledTimes(1);
    })

    it("should let user edit title and content for the post", async () => {
        renderWithQueryClient(<Provider store={store}><MemoryRouter><EditPostForm /></MemoryRouter></Provider>);

        const inputs = screen.getAllByRole("textbox");
        const user = userEvent.setup();

        await user.type(inputs[1], "A Post");
        await user.type(inputs[2], "post content...");

        expect(inputs[1]).toHaveValue("A Post");
        expect(inputs[2]).toHaveValue("post content...");
    })

    it.skip("should alert success if post is submitted correctly", async () => {
        const inputs = screen.getAllByRole("textbox");
        const user = userEvent.setup();

        const alertMock = vi.spyOn(window, "alert").mockImplementation(() => { return /created/i });

        await user.type(inputs[1], "A Post");
        await user.type(inputs[2], "post content...");

        const button = screen.getByRole("button");
        await user.click(button);

        expect(alertMock).toHaveBeenCalledTimes(1);
    })
})