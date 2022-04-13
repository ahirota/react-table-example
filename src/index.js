import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root"; 
import {
  fetchCategories,
  fetchStores,
  fetchProductsByCategory, 
  fetchStockByStore
} from "./util/api"; 

document.addEventListener("DOMContentLoaded", () => {
  //for testing 
  window.fetchCategories = fetchCategories; 
  window.fetchStores = fetchStores; 
  window.fetchProductsByCategory = fetchProductsByCategory; 
  window.fetchStockByStore = fetchStockByStore;

  //render app as root component
  const root = document.getElementById("root");
  ReactDOM.render(<Root />, root);
}); 