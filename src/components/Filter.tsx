import { Box, MenuItem, Select, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type TasksFilterProps = {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    statusFilter: "all" | "completed" | "uncompleted";
    onStatusChange: (value: "all" | "completed" | "uncompleted") => void;
};

export default function Filter({ searchQuery, onSearchChange, statusFilter, onStatusChange }: TasksFilterProps) {
    return (
        <Box sx={{ display: 'flex', width: '100%', maxWidth: '100%', flexWrap: 'wrap', gap: 2, alignItems: 'center'}}>
            <TextField
                label="Search tasks"
                size="small"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }
                }}
            />
            <Select
                size="small"
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value as "all" | "completed" | "uncompleted")}
            >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="uncompleted">Uncompleted</MenuItem>
            </Select>
        </Box>

    );
}
