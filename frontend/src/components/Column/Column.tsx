import React from "react";
import { Paper, List, Button, IconButton } from "@mui/material";
import { styled, Theme } from "@mui/system";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import EditableText from "../EditableText/EditableText";
import { Column as ColumnType } from "../../types";
import { appStore } from "../../stores";
import { TicketList } from "../Ticket/Ticket";

const StyledColumn = styled(Paper)(({ theme }: { theme: Theme }) => ({
  minWidth: "300px",
  padding: theme.spacing(2),
  backgroundColor: "#ebecf0",
  borderRadius: "8px",
  marginRight: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
}));

const Column: React.FC<ColumnType & { dragHandleProps: any }> = ({
  title,
  tickets,
  id,
  dragHandleProps,
}) => {
  return (
    <StyledColumn>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
      >
        <IconButton {...dragHandleProps}>
          <DragIndicatorIcon />
        </IconButton>
        <EditableText
          onChange={(newTitle) => appStore.changeColumnTitle(newTitle, id)}
          variant="h6"
          initialText={title}
        />
      </div>
      <List>
        <TicketList tickets={tickets} columnId={id} />
      </List>
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          onClick={() => appStore.addTicket(id)}
          size="small"
          variant="contained"
          color="primary"
        >
          Add Ticket
        </Button>
        <Button
          onClick={() => appStore.deleteColumn(id)}
          size="small"
          variant="contained"
          color="error"
        >
          Delete Column
        </Button>
      </div>
    </StyledColumn>
  );
};

export default Column;
