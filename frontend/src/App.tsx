import React, { useEffect } from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { observer } from "mobx-react-lite";
import { appStore } from "./stores";
import { BoardView } from "./components/BoardView/BoardView";
import { CircularProgress, Typography } from "@mui/material";

const App = observer(() => {
  useEffect(() => {
    (async () => {
      await appStore.init();
    })();
  }, []);

  if (appStore.error) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h2" color="error">
          {appStore.error}
        </Typography>
      </div>
    );
  }

  if (appStore.loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={120} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Sidebar boards={appStore.boards} />
      <BoardView board={appStore.selectedBoard} />
    </div>
  );
});

export default App;
