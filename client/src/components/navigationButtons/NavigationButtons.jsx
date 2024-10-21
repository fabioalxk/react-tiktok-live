import React from "react";

function NavigationButtons({
  handlePreviousTable,
  handleNextTable,
  currentTables,
}) {
  return (
    <div className="navigation-buttons">
      <button onClick={handlePreviousTable} disabled={currentTables === 0}>
        {"<"}
      </button>
      <button onClick={handleNextTable} disabled={currentTables === 1}>
        {">"}
      </button>
    </div>
  );
}

export default NavigationButtons;
