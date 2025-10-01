import { useEffect, useState, useCallback } from "react";
import { Task } from "../types";

const BASE_URL = "http://localhost:3008/api";

export default function useFetch() {
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/tasks`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            setError(error instanceof Error ? error : new Error("Error"));
        }
        finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchTasks(); }, [fetchTasks]);

    return { error, isLoading, tasks, refetch: fetchTasks };
}