import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
} from "@mui/material";
import { styled, Theme } from "@mui/system";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import DeleteIcon from "@mui/icons-material/Delete";
import EditableText from "../EditableText/EditableText";
import { Column as ColumnType } from "../../types";
import { appStore } from "../../stores";

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

const StyledTicket = styled(ListItem)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(1),
  backgroundColor: "#fff",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}));

const TicketButtons = styled("div")({
  marginTop: "30px",
  display: "flex",
  alignSelf: "flex-end",
});

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
        {tickets.map((ticket, index) => (
          <StyledTicket key={index}>
            <ListItemText
              primary={
                <EditableText
                  onChange={(newText) =>
                    appStore.changeTicketData({
                      columnId: id,
                      ticketId: ticket.id,
                      key: "title",
                      newText,
                    })
                  }
                  initialText={ticket.title}
                />
              }
              secondary={
                <EditableText
                  onChange={(newText) =>
                    appStore.changeTicketData({
                      columnId: id,
                      ticketId: ticket.id,
                      key: "description",
                      newText,
                    })
                  }
                  initialText={ticket.description}
                />
              }
            />
            <TicketButtons>
              <IconButton
                aria-label="delete"
                onClick={() => appStore.deleteTicket(id, ticket.id)}
              >
                <DeleteIcon />
              </IconButton>
            </TicketButtons>
          </StyledTicket>
        ))}
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
