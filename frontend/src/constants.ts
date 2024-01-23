import { v4 as uuidv4 } from "uuid";

export const GET_DEFAULT_NEW_BOARD = () => {
  return {
    id: uuidv4(),
    title: "New Board!",
    columns: [
      { id: uuidv4(), tickets: [], title: "To Do" },
      { id: uuidv4(), tickets: [], title: "In progress" },
      { id: uuidv4(), tickets: [], title: "Done" },
    ],
  };
};

export const GET_DEFAULT_NEW_COLUMN = () => {
  return { id: uuidv4(), tickets: [], title: "New Column" };
};

export const GET_DEFAULT_NEW_TICKET = () => {
  return { id: uuidv4(), title: "New TASK", description: "Description" };
};

export const COLUMN_DND_TYPE = "COLUMNS";
export const TICKET_DND_TYPE = "TICKETS";
