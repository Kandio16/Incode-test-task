import React from "react";
import { Button, Typography } from "@mui/material";
import EditableText from "../EditableText/EditableText";
import Column from "../Column/Column";
import { Board } from "../../types";
import { observer } from "mobx-react-lite";
import { appStore } from "../../stores";

interface SidebarProps {
  board: Board | null;
}
export const BoardView: React.FC<SidebarProps> = observer(({ board }) => {
  function onTitleChange(newTitle: string) {
    appStore.changeBoardTitle(newTitle);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        marginLeft: "250px",
        marginTop: "30px",
        height: "100%",
      }}
    >
      {board ? (
        <>
          <EditableText
            variant="h4"
            initialText={board.title}
            onChange={onTitleChange}
          />
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              overflowX: "auto",
              padding: "20px",
              height: "80%",
            }}
          >
            {board.columns.map((column) => (
              <Column
                key={column.id}
                id={column.id}
                title={column.title}
                tickets={column.tickets}
              />
            ))}
            <Button
              variant="contained"
              onClick={appStore.addColumn}
              color="primary"
              style={{ minWidth: "max-content" }}
            >
              Add Column
            </Button>
          </div>
        </>
      ) : (
        <Typography variant="h3" align="center">
          Choose or Create the Board
        </Typography>
      )}
      <Button
        onClick={appStore.deleteBoard}
        size="small"
        style={{
          width: "max-content",
          marginBottom: "20px",
          marginRight: "20px",
          alignSelf: "flex-end",
          display: appStore.selectedBoard ? "block" : "none",
        }}
        variant="contained"
        color="error"
      >
        Delete Board
      </Button>
    </div>
  );
});
