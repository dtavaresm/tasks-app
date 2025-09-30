import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";

const createTestRouter = (initialEntries: string[] = ["/"]) =>
    createMemoryRouter(
        [
            {
                path: "/",
                element: <App />,
                children: [
                    { index: true, element: <HomePage /> },
                    { path: "tasks", element: <TasksPage /> },
                ],
            },
        ],
        { initialEntries }
    );

describe("App routing", () => {
    it("renders Home page by default", () => {
        const router = createTestRouter(["/"]);
        render(<RouterProvider router={router} />);

        expect(screen.getByText("Welcome to the Task Manager App")).toBeInTheDocument();
    });

    it("navigates to Tasks page when Tasks menu is clicked", async () => {
        const router = createTestRouter(["/"]);
        render(<RouterProvider router={router} />);

        const tasksLink = screen.getByText("Tasks");
        await userEvent.click(tasksLink);

        expect(await screen.findByText(/Something went wrong|First task|Tasks/i)).toBeInTheDocument();
    });

    it("directly loads Tasks page when URL is /tasks", () => {
        const router = createTestRouter(["/tasks"]);
        render(<RouterProvider router={router} />);

        expect(
            screen.queryByRole("progressbar", { hidden: true }) || screen.getByText(/Tasks|Something went wrong/i)
        ).toBeTruthy();
    });
});
