import React from "react";
import {
  Drawer,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Board } from "../../types";
import { appStore } from "../../stores";

interface SidebarProps {
  boards: Board[];
}

export const Sidebar: React.FC<SidebarProps> = ({ boards }) => {
  return (
    <Drawer variant="permanent" anchor="left">
      <List style={{ maxWidth: "240px" }}>
        <ListItem>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={appStore.addNewBoard}
          >
            Create Board
          </Button>
        </ListItem>
        <ListItem>
          <TextField size="small" label="Search" fullWidth />
        </ListItem>
        <ListItem>
          <List style={{ width: "100%" }}>
            {boards.length ? (
              boards.map((board) => (
                <ListItem
                  button
                  onClick={() => appStore.setSelectedBoard(board.id)}
                  key={board.id}
                >
                  <ListItemText primary={board.title} />
                </ListItem>
              ))
            ) : (
              <Typography variant="caption">Create new board...</Typography>
            )}
          </List>
        </ListItem>
      </List>
    </Drawer>
  );
};
