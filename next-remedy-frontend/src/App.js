import React, { useState } from "react";
import AppRouter from './routes/Router';

function App() {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  return (
    <div>
      <AppRouter
        isSidebarMinimized={isSidebarMinimized}
        setIsSidebarMinimized={setIsSidebarMinimized}
      />
    </div>
  );
}

export default App;
