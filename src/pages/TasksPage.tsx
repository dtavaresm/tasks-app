import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { Alert, Box, CircularProgress, IconButton, Pagination, Stack } from "@mui/material";
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import TasksList from "../components/TasksList";

export default function TasksPage() {
    const { error, isLoading, tasks, refetch } = useFetch();
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;
    const paginationCount = Math.ceil(tasks.length / itemsPerPage);

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
                    <RefreshRoundedIcon sx={{ color: 'primary.main' }} onClick={refetch} />
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
