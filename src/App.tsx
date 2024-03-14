// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { useState } from "react";

import SideBar from "./components/sideBar";
import Home from "./tabs/Home";
import Tasks from "./tabs/Tasks";
import Notes from "./tabs/Notes";
import Settings from "./tabs/Settings";

export enum Tabs {
  home = "home",
  tasks = "tasks",
  notes = "notes",
  settings = "settings"
}

function App() {
  const [tab, setTab] = useState<Tabs>(Tabs.home);

  const getTab = () => {
    switch (tab) {
      case Tabs.home:
        return <Home />;
      case Tabs.tasks:
        return <Tasks />;
      case Tabs.notes:
        return <Notes />;
      case Tabs.settings:
        return <Settings />;
      default:
        return <Home />;
    }
  };

  const handleTabSwitch = (newTab: Tabs) => setTab(newTab);

  return (
    <div className="font-taskly min-h-screen grid grid-cols-3 antialiased">
      <SideBar onTabSwitch={handleTabSwitch} />
      {getTab()}
    </div>
  );
}

export default App;
