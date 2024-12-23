export type ColumnConfig = {
  id: string;
  label: string;
  type: "string" | "tags" | "date" | "number" | "boolean";
  options?: string[];
};

export interface Chip {
  column: string;
  operator: string;
  value: string;
}
