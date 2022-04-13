import React from "react";
import "../styles/reset.css"; 
import "../styles/layout-header.css"; 
import "../styles/inventory.css"; 
import "../styles/table.css";
import Inventory from "./inventory/inventory";
import Header from "./header";

function App() {
  return (
    <div className="content-wrapper">
      <header>
        <Header/>
      </header>
      <Inventory/>
    </div>
  );
}

export default App;
