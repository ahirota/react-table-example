import React, { useState, useEffect } from 'react'; 

export default function Header() {
    const [error, setError] = useState("");

    return (
      <div>
        <div className="inventory-header">
          <div className="inventory-header-content">
            <h1>React Table</h1>
          </div>
        </div>
      </div>
    );
}
