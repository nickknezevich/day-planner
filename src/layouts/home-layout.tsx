import { Box, Container } from "@mui/material";
import { ReactNode } from "react";
import { useTheme } from "@mui/material";
import { Header } from "@/components/header";

type LayoutProps = {
  children: ReactNode;
};


const HomeLayout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  return (
    <Box>
      <Header />
      <Box
        sx={{
          mt: { xs: 12, sm: 0 }, 
          p: 0,
          pt: 0,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 2 }}>
            {children}
        </Container>
      </Box>
    </Box>
  );
};

export default HomeLayout;
