import { createEvent, createStore } from "effector";
import { Table } from "../types/sql";
import { persist } from "effector-storage/local"

export const appendTable = createEvent<Table>()
export const $tables = createStore<Table[]>([])

$tables.on(appendTable, (tables, table) => ([
    ...tables,
    table
]))

persist({
    store: $tables,
    key: 'tables'
})


