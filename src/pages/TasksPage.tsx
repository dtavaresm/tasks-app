import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Alert, Box, CircularProgress, IconButton, Pagination, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import TasksList from "../components/TasksList";
import { Task } from "../types";
import Filter from "../components/Filter";

const StyledAlert = styled(Alert)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box'
}));

const StyledLoadingContainerBox = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh"
}));

const StyledTasksContainerBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
}));

export default function TasksPage() {
    const { error, isLoading, tasks: fetchedTasks, refetch } = useFetch();
    const location = useLocation();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "uncompleted">("all");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        refetch();
    }, [location.key]);

    const filteredList = tasks.filter((task) => {
        const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "completed" && task.completed) ||
            (statusFilter === "uncompleted" && !task.completed);

        return matchesSearch && matchesStatus;
    })

    const itemsPerPage = 5;
    const paginationCount = Math.max(1, Math.ceil(filteredList.length / itemsPerPage));

    useEffect(() => {
        setTasks(fetchedTasks);
    }, [fetchedTasks]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter]);

    const handleDeleteTask = (id: number) => {
        setTasks((prev) => {
            const updatedTasks = prev.filter((t) => t.id !== id);
            const newPaginationCount = Math.max(1, Math.ceil(updatedTasks.length / itemsPerPage));
            if (currentPage > newPaginationCount) {
                setCurrentPage(newPaginationCount);
            }
            return updatedTasks;
        });
    };

    if (isLoading) {
        return (
            <StyledLoadingContainerBox>
                <CircularProgress size={80} sx={{ color: 'primary.main' }} />
            </StyledLoadingContainerBox>
        );
    }

    if (error) {
        return (
            <StyledAlert severity="error">
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {error.message ? (
                        <Typography variant="body2" >
                            {error.message}. Please try again.
                        </Typography>
                    ) : (
                        <Typography variant="body2">
                            Something went wrong. Please try again.
                        </Typography>)}
                    <IconButton aria-label="refresh" sx={{ ml: 2 }} onClick={refetch}>
                        <RefreshRoundedIcon sx={{ color: 'primary.main' }} />
                    </IconButton>
                </Box>
            </StyledAlert>
        )
    }

    return (
        <StyledTasksContainerBox>
            <Filter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
            />
            <TasksList
                fetchedData={filteredList}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onDelete={handleDeleteTask}
            />
            {filteredList.length > 0 && (
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
            )}

        </StyledTasksContainerBox>
    )
}
