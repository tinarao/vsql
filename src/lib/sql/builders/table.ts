import { Column, SQLType, Table } from "@/lib/types/sql";
import { nanoid } from "nanoid";

type TableFabricArgs = { name: string; desc?: string };
type ColumnFabricArgs = {
    name: string;
    type: SQLType;
    isPK?: boolean;
    isFK?: boolean;
    isUnique?: boolean;
    isNullable?: boolean;
};

export function createColumn({ name, type, isPK = false, isFK = false, isNullable = false, isUnique = false }: ColumnFabricArgs): Column {
    return {
        uuid: nanoid(128),
        name,
        sqlType: type,
        isFK,
        isPK,
        isNullable,
        isUnique
    };
}

export function createTable({ name, desc }: TableFabricArgs): Table {
    const idColumn = createColumn({
        name: "id",
        type: "SERIAL",
        isPK: true
    })

    return {
        uuid: nanoid(128),
        name,
        desc,
        columns: [
            idColumn
        ],
        createdAt: new Date().toISOString(),
        lastUpdatedAt: new Date().toISOString(),
    };
}
