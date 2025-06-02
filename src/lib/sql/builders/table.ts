import { Table } from "@/lib/types/sql";
import { nanoid } from "nanoid";

type TableFabricArgs = { name: string; desc?: string };

export const createTable = ({ name, desc }: TableFabricArgs): Table => {
  return {
    uuid: nanoid(128),
    name,
    desc,
    rows: [],
    createdAt: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString()
  };
};
