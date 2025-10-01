import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, IconButton, Paper, Typography } from '@mui/material';
import { Task } from "../types";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3, 2),
    borderRadius: theme.spacing(2),
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.primary.light,
}));

type TaskCardProps = {
    task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <StyledPaper elevation={3}>
            <IconButton aria-label="delete" sx={{ float: 'right' }} onClick={handleClickOpen}>
                <DeleteIcon sx={{ color: 'primary.main' }} />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this file?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This will permanently delete the task.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button aria-label="cancel" onClick={handleClose}>Disagree</Button>
                    <Button aria-label="ok" onClick={handleClose}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

            <Typography variant="body1" sx={{ color: 'primary.dark' }}>
                {task.text}
            </Typography>

            <FormGroup>
                <FormControlLabel control={<Checkbox checked={task.completed} />} label={task.completed ? "Completed" : "Unfinished"} />
            </FormGroup>
        </StyledPaper>
    );
} 