import React, { PropsWithChildren } from "react";
import { Container, AppBar, Toolbar, Typography, Box } from "@mui/material";

export const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My Rich Text Editor</Typography>
        </Toolbar>
      </AppBar>
      <Box mt={2}>{children}</Box>
    </Container>
  );
};
