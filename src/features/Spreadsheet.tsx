import React from "react";
import Controls from "./Controls";
import { InputProvider } from "../contexts/InputContext";
import { COLUMN_CONFIG, ROW_DATA } from "../config";
import "./Spreadsheet.css";

const Table: React.FC<{
  filteredData: typeof ROW_DATA;
}> = ({ filteredData }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {COLUMN_CONFIG.map((column) => (
              <th key={column.id}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {COLUMN_CONFIG.map((column) => (
                <td key={column.id}>{row[column.id as keyof typeof row]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Spreadsheet: React.FC = () => {
  const filteredData = ROW_DATA;

  return (
    <div className="spreadsheet">
      <InputProvider>
        <Controls />
      </InputProvider>
      <Table filteredData={filteredData} />
    </div>
  );
};

export default Spreadsheet;
