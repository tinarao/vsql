import { Table } from '@/lib/types/sql';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { memo, useCallback } from 'react';
import {
    Table as UITable,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { PenSquareIcon } from 'lucide-react';
import { ColumnEditorModal } from './ColumnEditorModal';
import { createColumn } from '@/lib/sql/fabrics/table';

interface TableDetailsProps {
    table: Table;
    onUpdate: (table: Table) => void;
}


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
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Колонки</h3>
                    <Button onClick={handleAddColumn}>
                        Добавить колонку
                    </Button>
                </div>
                
                <UITable>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Название</TableHead>
                            <TableHead>Тип данных</TableHead>
                            <TableHead>Действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {table.columns.map((column, index) => (
                            <TableRow 
                                key={column.uuid}
                                className="cursor-pointer hover:bg-muted/50"
                            >
                                <TableCell>{column.name}</TableCell>
                                <TableCell className={column.isPK ? "text-primary" : ""}>{column.sqlType}</TableCell>
                                <TableCell>
                                    <ColumnEditorModal column={column} index={index} onUpdate={handleColumnUpdate}>
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <PenSquareIcon  />
                                    </Button>
                                    </ColumnEditorModal>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </UITable>
            </div>
        </div>
    );
}); 
