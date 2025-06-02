import { Table, SQLType, SQL_TYPES } from '@/lib/types/sql';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { memo, useCallback } from 'react';
import { createColumn } from '@/lib/sql/builders/table';

interface TableDetailsProps {
    table: Table;
    onUpdate: (table: Table) => void;
}

const ColumnEditor = memo(({
    column,
    index,
    onUpdate
}: {
    column: Table['columns'][0];
    index: number;
    onUpdate: (index: number, column: Table['columns'][0]) => void;
}) => {
    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdate(index, { ...column, name: e.target.value });
    }, [column, index, onUpdate]);

    const handleTypeChange = useCallback((value: SQLType) => {
        onUpdate(index, { ...column, sqlType: value });
    }, [column, index, onUpdate]);

    return (
        <div className="flex gap-2">
            <Input
                value={column.name}
                onChange={handleNameChange}
            />
            <Select
                value={column.sqlType}
                onValueChange={handleTypeChange}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                    {SQL_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                            {type.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
});

ColumnEditor.displayName = 'ColumnEditor';

export const TableDetails = memo(function TableDetails({ table, onUpdate }: TableDetailsProps) {

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdate({ ...table, name: e.target.value });
    }, [table, onUpdate]);

    const handleColumnUpdate = useCallback((index: number, updatedColumn: Table['columns'][0]) => {
        const newColumns = [...table.columns];
        newColumns[index] = updatedColumn;
        onUpdate({ ...table, columns: newColumns });
    }, [table, onUpdate]);

    const handleAddColumn = useCallback(() => {
        const newCol = createColumn({ name: "field", type: "TEXT" })
        onUpdate({
            ...table,
            columns: [...table.columns, newCol]
        });
    }, [table, onUpdate]);

    if (!table) {
        return (
            <div className="p-4 text-muted-foreground">
                Выберите таблицу для просмотра деталей
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            <div>
                <Label htmlFor="table-name">Название таблицы</Label>
                <Input
                    id="table-name"
                    value={table.name}
                    onChange={handleNameChange}
                />
            </div>

            <div>
                <h3 className="font-medium mb-2">Колонки</h3>
                <div className="space-y-2">
                    {table.columns && table.columns.map((column, index) => (
                        <ColumnEditor
                            key={column.uuid}
                            column={column}
                            index={index}
                            onUpdate={handleColumnUpdate}
                        />
                    ))}
                </div>
                <Button
                    className="mt-2"
                    onClick={handleAddColumn}
                >
                    Добавить колонку
                </Button>
            </div>
        </div>
    );
}); 
