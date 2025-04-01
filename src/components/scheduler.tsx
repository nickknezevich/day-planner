"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  CircularProgress,
  CardContent,
  Card,
  Divider,
  Container,
} from "@mui/material";
import { useState, useRef } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

type TaskItem = {
    taskName: string;
    startTime: string;
    endTime: string;
    rationales: string[];
  };

export const Scheduler = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState<TaskItem[]|undefined>();
  const textFieldRef = useRef<HTMLInputElement | null>(null);

  const handleAddTask = () => {
    // usually I would use formik with yup for FE validation
    if(taskInput === '') return;
    setTasks([...tasks, taskInput]);
    setTaskInput("");
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        if(taskInput === '') return;
      handleAddTask();
    }
  };

  const handleGeneratePlan = async () => {
    // Usually I would put this logic to a hook. Eg. use-planning
    setIsLoading(true);
    const res = await fetch("/api/plan-day", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasks }),
    });
    const data = await res.json();

    setSchedule(data.response);
    setIsLoading(false);
  };

  const handleClear = async () => {
    setTasks([]);
    setTaskInput("");
    if (textFieldRef.current) {
      textFieldRef.current.focus(); // Focus the TextField after clearing
    }
    setSchedule(undefined)
  };
  return (
    <Container maxWidth="md" sx={{ mt: isMobile ? 0 : 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, sm: 9 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              What do you want to accomplish today?
            </Typography>
            <TextField
              label="Task"
              placeholder="Eg. Go to watch the sunset at the beach!"
              variant="outlined"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              sx={{ width: '100%' }}
              fullWidth={isMobile}
              size="small"
              onKeyPress={handleKeyPress}
              inputRef={textFieldRef}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Button
              variant="contained"
              onClick={handleAddTask}
              color="warning"
              size="medium"
              fullWidth
              sx={{ mt: !isMobile ? 4.8 : 0 }}
            >
              Add Task
            </Button>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, sm: 12 }} sx={{ mt: 4 }}>
          <Box sx={{ mb: 4 }}>
            {tasks.map((task, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center", // Aligns items vertically centered
                  textAlign: "left",
                  justifyContent: "left",
                  mt: 2,
                }}
              >
                <TipsAndUpdatesIcon color="warning" />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {index + 1}.
                </Typography>
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {" "}
                  {/* Add margin left to create space between icon and text */}
                  {task}
                </Typography>
              </Box>
            ))}
          </Box>
          {tasks.length > 0 && (
            <Button
              variant="outlined"
              color="info"
              onClick={handleGeneratePlan}
              fullWidth
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                "Make me a schedule"
              )}
            </Button>
          )}
          {tasks.length > 0 && (
            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              color="warning"
              onClick={handleClear}
              fullWidth
            >
              Nah, give me another plan.
            </Button>
          )}
        </Grid>
        <Grid size={{ xs: 12, sm: 12 }} sx={{ mt: 4 }}>
          {schedule?.length && schedule.length > 0 && (
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h5">Your Day Plan:</Typography>
              <Box
                sx={{ width: "100%", maxWidth: '%100', margin: "0 auto", mt: 4 }}
              >
                {schedule.length>0 && schedule?.map((item, index) => (
                  <Card key={index} sx={{ marginBottom: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {item.taskName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", marginBottom: 2 }}
                      >
                        {item.startTime}
                      </Typography>
                      <Divider sx={{ marginBottom: 2 }} />
                      <Typography variant="body1">{item.rationales}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          )}
        </Grid>
      </Container>
  );
};
