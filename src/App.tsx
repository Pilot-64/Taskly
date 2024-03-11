// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

import SideBar from "./components/sideBar";
import Home from "./tabs/Home";

function App() {
  return (
    <div className="min-h-screen grid grid-cols-3 antialiased">
      <SideBar />
      <Home />
    </div>
  );
}

export default App;
