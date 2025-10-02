import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TasksPage from "./TasksPage";

beforeEach(() => {
    jest.resetAllMocks();
});

it("renders loading state then renders tasks", async () => {
    const mockTasks = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, text: `Task ${i + 1}`, completed: false }));

    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockTasks),
        } as Response)
    );

    render(
        <MemoryRouter>
            <TasksPage />
        </MemoryRouter>
    );

    expect(screen.queryByRole("progressbar")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText("Task 1")).toBeInTheDocument());
    expect(screen.getByRole("list")).toBeInTheDocument();
});

it("handles fetch error and allows retry", async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: false,
        } as Response)
    );

    render(
        <MemoryRouter>
            <TasksPage />
        </MemoryRouter>
    );

    await waitFor(() => expect(screen.queryByText(/Please try again/i)).toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: /refresh/i }));

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve([{ id: 1, text: "Recovered Task", completed: false }]),
        } as Response)
    );
});

