import React from "react";
import DropdownControl from "./DropdownControl";

export default function App() {
  const handleAdd = (countrySelected) => {
    /* Showing or accessing value from child component and printing in console*/
    console.log("Country selected in child", countrySelected);
  };
  return (
    <div className="smart-dropdown-container">
      <DropdownControl handleAddItems={handleAdd} />
    </div>
  );
}
