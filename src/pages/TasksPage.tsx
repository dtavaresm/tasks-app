import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, IconButton, Pagination, Stack } from "@mui/material";
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { Task } from "../types";
import TasksList from "../components/TasksList";

const BASE_URL = "http://localhost:8080/api";

export default function TasksPage() {
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;
    const paginationCount = Math.ceil(tasks.length / itemsPerPage);

    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/tasks`);
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            setError(error instanceof Error ? error : new Error("Error"));
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchTasks(); }, []);

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                <CircularProgress size={80} sx={{ color: 'primary.main' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: 'stretch' }}>
                Something went wrong. Please try again.
                <IconButton aria-label="delete" sx={{ ml: 2 }}>
                    <RefreshRoundedIcon sx={{ color: 'primary.main' }} onClick={fetchTasks} />
                </IconButton>
            </Alert>
        )
    }

    return (
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: 'stretch' }}>
            <TasksList fetchedData={tasks} currentPage={currentPage} itemsPerPage={itemsPerPage} />
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
                {paginationCount > 1 && (
                    <Pagination
                        count={paginationCount}
                        siblingCount={0} 
                        boundaryCount={1}
                        size="small"
                        page={currentPage}
                        onChange={(_, page) => setCurrentPage(page)}
                        color="primary"
                    />
                )}
            </Stack>
        </Box>
    )
}
