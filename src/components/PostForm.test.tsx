import { render, screen } from "@testing-library/react"
import PostForm from "./PostForm";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "../store";
import userEvent from '@testing-library/user-event'

const renderWithQueryClient = (ui: React.ReactElement) => {
    const queryClient = new QueryClient();
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe("PostForm", () => {

    beforeEach(() => {
        renderWithQueryClient(<Provider store={store}><PostForm /></Provider>);
    })

    it("should have image, title and content inputs", () => {
        const inputs = screen.getAllByRole("textbox");

        expect(inputs).toHaveLength(3);
    })

    it("should alert empty if post submitted with title or content empty", async () => {
        const user = userEvent.setup();

        const alertMock = vi.spyOn(window, "alert").mockImplementation(() => { return "Title and Content cannot be empty. Please add a title and content." });

        const button = screen.getByRole("button");
        await user.click(button);

        expect(alertMock).toHaveBeenCalledTimes(1);
    })

    it("should let user write a title and content for the post", async () => {
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