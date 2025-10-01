import { renderHook, waitFor } from "@testing-library/react";
import useFetch from './useFetch';

beforeEach(() => {
    jest.resetAllMocks();
});

it("should fetch tasks successfully", async () => {
    const mockTasks = [
        { id: 1, text: "Test Task 1", completed: false },
        { id: 2, text: "Test Task 2", completed: true },
    ];

    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockTasks),
        } as Response)
    );

    const { result } = renderHook(() => useFetch());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.tasks).toEqual(mockTasks);
});

it("should handle fetch error", async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: false,
        } as Response)
    );

    const { result } = renderHook(() => useFetch());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.tasks).toEqual([]);
});