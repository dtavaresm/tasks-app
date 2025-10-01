import { Task } from "../types";
import TaskCard from "./TaskCard";
import { Box } from '@mui/material';
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
};

export default function TasksList({ fetchedData, currentPage, itemsPerPage }: TasksListProps) {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentData = fetchedData.slice(firstIndex, lastIndex);

    return (
        <StyledBox>
            {currentData.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </StyledBox>
    )
}