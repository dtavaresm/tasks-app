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
    onDelete: (id: number) => void;
};

export default function TaskCard({ task, onDelete }: TaskCardProps) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };

    const handleConfirmDelete = () => {
        onDelete(task.id);
        handleClose();
    }

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
                    {"Are you sure you want to delete this task?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This will delete the task only on client side.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button aria-label="cancel" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button aria-label="ok" onClick={handleConfirmDelete} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <Typography variant="body1" sx={{ color: 'primary.dark' }}>
                {task.text}
            </Typography>

            <FormGroup>
                <FormControlLabel control={<Checkbox checked={task.completed} />} label="Completed" />
            </FormGroup>
        </StyledPaper>
    );
} 