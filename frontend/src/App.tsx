import React from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import Column from "./components/Column/Column";
import { Button } from "@mui/material";
import EditableText from "./components/EditableText/EditableText";
const handleSave = (editedText: string) => {
  console.log("Saved:", editedText);
};
interface AppProps {}

const App: React.FC<AppProps> = () => {
  const boards = [
    { title: "Board1", id: 1 },
    { title: "Board2", id: 2 },
    { title: "Board3", id: 3 },
    { title: "Board4", id: 4 },
  ];
  const columns = [
    {
      title: "To Do",
      tickets: [
        { title: "Task 1", description: "Description for Task 1" },
        { title: "Task 2", description: "Description for Task 2" },
      ],
    },
    {
      title: "In Progress",
      tickets: [
        { title: "Task 1", description: "Description for Task 1" },
        { title: "Task 2", description: "Description for Task 2" },
      ],
    },
    {
      title: "Done",
      tickets: [
        { title: "Task 1", description: "Description for Task 1" },
        { title: "Task 2", description: "Description for Task 2" },
      ],
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Sidebar boards={boards} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          marginLeft: "280px",
          marginTop: "30px",
        }}
      >
        <EditableText
          onSave={handleSave}
          variant="h4"
          initialText={" Main Title"}
        />
        ,
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            overflowX: "auto",
          }}
        >
          {columns.map((column, index) => (
            <Column key={index} title={column.title} tickets={column.tickets} />
          ))}
          <Button
            variant="contained"
            onInput={() => console.log(1)}
            color="primary"
          >
            Add Column
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
