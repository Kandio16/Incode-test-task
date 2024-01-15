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

import DeleteIcon from "@mui/icons-material/Delete";
import EditableText from "../EditableText/EditableText";

interface Ticket {
  title: string;
  description: string;
}

interface ColumnProps {
  title: string;
  tickets: Ticket[];
}

const StyledColumn = styled(Paper)(({ theme }: { theme: Theme }) => ({
  width: "300px",
  padding: theme.spacing(2),
  backgroundColor: "#ebecf0",
  borderRadius: "8px",
  marginRight: theme.spacing(2),
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

const handleSave = (editedText: string) => {
  console.log("Saved:", editedText);
};

const Column: React.FC<ColumnProps> = ({ title, tickets }) => {
  return (
    <StyledColumn>
      <EditableText onSave={handleSave} variant="h6" initialText={title} />
      <List>
        {tickets.map((ticket, index) => (
          <StyledTicket key={index}>
            <ListItemText
              primary={
                <EditableText onSave={handleSave} initialText={ticket.title} />
              }
              secondary={
                <EditableText
                  onSave={handleSave}
                  initialText={ticket.description}
                />
              }
            />
            <TicketButtons>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </TicketButtons>
          </StyledTicket>
        ))}
      </List>
      <Button variant="contained" color="primary">
        Add Ticket
      </Button>
    </StyledColumn>
  );
};

export default Column;
