import { createEvent, createStore } from "effector";
import { Table } from "../types/sql";

const LOCAL_STORAGE_KEY = "tables"
const setTables = createEvent<Table[]>()
export const appendTable = createEvent<Table>()
export const updateTable = createEvent<Table>()
export const $tables = createStore<Table[]>([])

$tables
    .on(appendTable, (tables, table) => ([
    ...tables,
    table
]))
    .on(updateTable, (tables, updatedTable) => 
        tables.map(table => 
            table.uuid === updatedTable.uuid ? updatedTable : table
        )
    )
    .on(setTables, (tables, savedTables) => 
        tables = savedTables
    )


export const saveToLocalStorage = (data: Table[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
}

export const loadFromLocalStorage = () => {
    const rawData = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!rawData) {
        console.error("no raw data")
        setTables([])
        return
    }

    try {
        const tables = JSON.parse(rawData) as Table[]
        setTables(tables)
        console.info("successfully loaded saved data from localStorage")
    } catch {
        console.error("failed to get tables from localstorage")
        setTables([])
    }

}
