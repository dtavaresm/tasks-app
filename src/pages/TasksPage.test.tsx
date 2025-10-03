import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TasksPage from "./TasksPage";

beforeEach(() => {
    jest.resetAllMocks();
});

it("renders loading state then renders tasks", async () => {
    const mockTasks = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, text: `Task ${i + 1}`, completed: false }));

    global.fetch = jest.fn(() =>
        Promise.resolve().then(() => ({
            ok: true,
            json: () => Promise.resolve(mockTasks),
        } as Response))
    );

    await act(async () => {
        render(
            <MemoryRouter>
                <TasksPage />
            </MemoryRouter>
        )
    });

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    const task1 = await screen.findByText("Task 1");
    expect(task1).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
});


it("handles fetch error and allows retry", async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve().then(() => ({
            ok: false,
        } as Response))
    );

    await act(async () => {
        render(
            <MemoryRouter>
                <TasksPage />
            </MemoryRouter>
        )
    });

    await screen.findByText(/Please try again/i);

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve().then(() => ({
            ok: true,
            json: () => Promise.resolve([{ id: 1, text: "Recovered Task", completed: false }]),
        } as Response))
    );

    await act(async () => {
        fireEvent.click(screen.getByRole("button", { name: /refresh/i }));
    });

    await screen.findByText("Recovered Task");
});

