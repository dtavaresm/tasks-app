import { Task } from "../types";
import TaskCard from "./TaskCard";
import { Box } from '@mui/material';

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
        <Box sx={{
            display: 'flex',
            gap: 2,
            flexDirection: 'column',
            width: 'stretch',
            height: '70dvh',
            overflowY: 'auto',
            p:
            {
                xs: '1% 1% 2%',
                sm: '1% 2% 2%'
            },
        }}>
            {currentData.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </Box>
    )
}