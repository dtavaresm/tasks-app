import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, FormControlLabel, FormGroup, IconButton, Paper, Typography } from '@mui/material';
import { Task } from "../types";

type TaskCardProps = {
    task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
    return (
        <Paper elevation={3} sx={{ px: 3, py: 2, borderRadius: 2, width: 'stretch' }}>
            <IconButton aria-label="delete" sx={{ float: 'right' }}>
                <DeleteIcon sx={{ color: 'primary.main' }} />
            </IconButton>

            <Typography variant="body1" sx={{ color: 'primary.dark' }}>
                {task.text}
            </Typography>

            <FormGroup>
                <FormControlLabel control={<Checkbox checked={task.completed} />} label={task.completed ? "Completed" : "Unfinished"} />
            </FormGroup>
        </Paper>
    );
} 