import { Task } from "../types";
import TaskCard from "./TaskCard";
import { Box, Typography } from '@mui/material';
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    height: '70dvh',
    overflowY: 'auto',
    [theme.breakpoints.up('sm')]: {
        padding: '1% 2% 2%'
    },
    [theme.breakpoints.up('xs')]: {
        padding: '1% 1% 2%'
    },
}));

type TasksListProps = {
    fetchedData: Task[];
    currentPage: number;
    itemsPerPage: number;
    onDelete: (id: number) => void;
};

export default function TasksList({ fetchedData, currentPage, itemsPerPage, onDelete }: TasksListProps) {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentData = fetchedData.slice(firstIndex, lastIndex);

    return (
        <StyledBox>
            {currentData.length === 0 ?
                (<Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    No tasks found.
                </Typography>) :
                (currentData.map((task) => (
                    <TaskCard key={task.id} task={task} onDelete={onDelete} />
                )))}
        </StyledBox>
    )
}