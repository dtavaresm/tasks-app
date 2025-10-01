import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { Alert, Box, CircularProgress, IconButton, Pagination, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import TasksList from "../components/TasksList";

const StyledAlert = styled(Alert)(() => ({
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    width: 'stretch' 
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
    width: 'stretch'
}));

export default function TasksPage() {
    const { error, isLoading, tasks, refetch } = useFetch();
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;
    const paginationCount = Math.ceil(tasks.length / itemsPerPage);

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
                Something went wrong. Please try again.
                <IconButton aria-label="refresh" sx={{ ml: 2 }}>
                    <RefreshRoundedIcon sx={{ color: 'primary.main' }} onClick={refetch} />
                </IconButton>
            </StyledAlert>
        )
    }

    return (
        <StyledTasksContainerBox>
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
        </StyledTasksContainerBox>
    )
}
