import { useThemeContext } from "@/context/theme-context";
import { LightMode, DarkMode } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import Link from "next/link";

export const Header = () => {
  const theme = useTheme();
  const { toggleTheme } = useThemeContext();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Link href={"/"} replace={true} style={{ cursor: "pointer" }}>
                <img
                  src={"/logo.png"}
                  width={"32"}
                  style={{ marginRight: "15px", cursor: "pointer" }}
                />
              </Link>
              <Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, mt: "-0.2rem" }}
                >
                  Day Planner
                </Typography>
                <Box sx={{ mt: "-0.4rem" }}>
                  <Typography variant="caption" sx={{ fontWeight: 100, p: 0 }}>
                    Make every day an excitement.
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <IconButton
                edge="start"
                size="small"
                onClick={toggleTheme}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <LightMode fontSize="small" />
                ) : (
                  <DarkMode fontSize="small" />
                )}
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
