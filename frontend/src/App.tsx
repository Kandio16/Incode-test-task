import React, { useEffect } from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { observer } from "mobx-react-lite";
import { appStore } from "./stores";
import { BoardView } from "./components/BoardView/BoardView";

const App = observer(() => {
  useEffect(() => {
    (async () => {
      await appStore.init();
    })();
  }, []);

  if (appStore.error) {
    return (
      <div>
        <h5> {appStore.error}</h5>
      </div>
    );
  }

  if (appStore.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Sidebar boards={appStore.boards} />
      <BoardView board={appStore.selectedBoard} />
    </div>
  );
});

export default App;
