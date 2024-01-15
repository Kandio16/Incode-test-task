import React from "react";
import {
  Drawer,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

interface SidebarProps {
  boards: { title: string; id: number }[];
}

export const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem>
          <Button variant="contained" color="primary" fullWidth>
            Create Board
          </Button>
        </ListItem>
        <ListItem>
          <TextField size="small" label="Search" fullWidth />
        </ListItem>
        <ListItem>
          <List style={{ width: "100%" }}>
            {["Board 1", "Board 2", "Board 3"].map((board, index) => (
              <ListItem button onClick={() => console.log(board)} key={index}>
                <ListItemText primary={board} />
              </ListItem>
            ))}
          </List>
        </ListItem>
      </List>
    </Drawer>
  );
};
