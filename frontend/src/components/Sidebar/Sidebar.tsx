import React, { useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredBoards = boards.filter((board) =>
    board.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            label="Search"
            fullWidth
          />
        </ListItem>
        <ListItem>
          <List style={{ width: "100%" }}>
            {filteredBoards.length ? (
              filteredBoards.map((board) => (
                <ListItem
                  button
                  onClick={() => appStore.setSelectedBoard(board.id)}
                  key={board.id}
                >
                  <ListItemText primary={board.title} />
                </ListItem>
              ))
            ) : (
              <Typography variant="caption">
                {!searchTerm ? "Create new board..." : "No matching boards..."}
              </Typography>
            )}
          </List>
        </ListItem>
      </List>
    </Drawer>
  );
};
