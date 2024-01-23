import React from "react";
import { Draggable } from "react-beautiful-dnd";
import EditableText from "../EditableText/EditableText";
import { appStore } from "../../stores";
import {
  IconButton,
  ListItem,
  ListItemText,
  Theme,
  styled,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Ticket as TicketType } from "../../types";

import { Droppable } from "react-beautiful-dnd";
import { TICKET_DND_TYPE } from "../../constants";

interface TicketListProps {
  tickets: TicketType[];
  columnId: string;
}

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  columnId,
}) => {
  return (
    <Droppable droppableId={columnId} type={TICKET_DND_TYPE}>
      {(provided) => (
        <div
          style={{ minHeight: "100px" }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tickets.map((ticket, index) => (
            <Ticket
              key={ticket.id}
              ticket={ticket}
              index={index}
              columnId={columnId}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

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

interface TicketProps {
  ticket: TicketType;
  index: number;
  columnId: string;
}

const Ticket: React.FC<TicketProps> = ({ ticket, index, columnId }) => {
  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided, snapshot) => (
        <StyledTicket
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListItemText
            primary={
              <EditableText
                onChange={(newText) =>
                  appStore.changeTicketData({
                    columnId: columnId,
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
                    columnId: columnId,
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
              onClick={() => appStore.deleteTicket(columnId, ticket.id)}
            >
              <DeleteIcon />
            </IconButton>
          </TicketButtons>
        </StyledTicket>
      )}
    </Draggable>
  );
};
