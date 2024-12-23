import { BrowserRouter } from "react-router-dom";
import Spreadsheet from "./features/Spreadsheet";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Spreadsheet />
      </BrowserRouter>
    </>
  );
}

export default App;
