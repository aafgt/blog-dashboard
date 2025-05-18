import { render, screen } from "@testing-library/react"
import Post from "./Post"
import { PostInterface } from "../types"
import { BrowserRouter } from "react-router";
import { formattedDateTime } from "../util/util";

describe("Post", () => {
    const postProps: PostInterface = {
        id: 1,
        content: "Some content",
        date: new Date().toISOString(),
        postImage: "",
        title: "Test Post"
    }

    beforeEach(() => {
        render(<BrowserRouter><Post post={postProps} /></BrowserRouter>);
    });

    it("Should have a title, date and content", () => {
        const title = screen.getByText(postProps.title);
        const date = screen.getByText(formattedDateTime(postProps.date));
        const content = screen.getByText(postProps.content);
        expect(title).toBeInTheDocument();
        expect(date).toBeInTheDocument();
        expect(content).toBeInTheDocument();

        // screen.debug();
    })

    it("should have a link to post", () => {
        const linkElement = screen.getByRole("link");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", `/${(postProps.id).toString()}`);
    })
})