import { Table } from "@/lib/types/sql";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { memo, useCallback } from "react";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { PenSquareIcon, PlusIcon, Trash } from "lucide-react";
import { ColumnEditorModal } from "./ColumnEditorModal";
import { createColumn } from "@/lib/sql/fabrics/table";
import { RelationsManager } from "@/components/RelationsManager";

interface TableDetailsProps {
  table: Table;
  onUpdate: (table: Table) => void;
}

export const TableDetails = memo(function TableDetails({
  table,
  onUpdate,
}: TableDetailsProps) {
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate({ ...table, name: e.target.value });
    },
    [table, onUpdate],
  );

  const handleColumnUpdate = useCallback(
    (index: number, updatedColumn: Table["columns"][0]) => {
      const newColumns = [...table.columns];
      newColumns[index] = updatedColumn;
      onUpdate({ ...table, columns: newColumns });
    },
    [table, onUpdate],
  );

  const handleAddColumn = useCallback(() => {
    const newCol = createColumn({ name: "field", type: "TEXT" });
    onUpdate({
      ...table,
      columns: [...table.columns, newCol],
    });
  }, [table, onUpdate]);

  const handleRemoveColumn = useCallback(
    (uuidToDelete: string) => {
      const newColumns = table.columns.filter((c) => c.uuid !== uuidToDelete);
      onUpdate({
        ...table,
        columns: newColumns,
      });
    },
    [table, onUpdate],
  );

  if (!table) {
    return (
      <div className="text-muted-foreground p-4">
        Выберите таблицу для просмотра деталей
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="table-name">Название таблицы</Label>
        <Input id="table-name" value={table.name} onChange={handleNameChange} />
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-medium">Колонки</h3>
          <Button
            className="size-8"
            variant="outline"
            onClick={handleAddColumn}
          >
            <PlusIcon />
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
                className="hover:bg-muted/50 cursor-pointer"
              >
                <TableCell>{column.name}</TableCell>
                <TableCell className={column.isPK ? "text-primary" : ""}>
                  {column.sqlType}
                </TableCell>
                <TableCell className="space-x-2">
                  <ColumnEditorModal
                    column={column}
                    index={index}
                    onUpdate={handleColumnUpdate}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <PenSquareIcon />
                    </Button>
                  </ColumnEditorModal>
                  <Button
                    onClick={() => handleRemoveColumn(column.uuid)}
                    size="icon"
                    variant="ghost"
                    className="hover:bg-red-500 hover:text-white"
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </UITable>
      </div>
      <RelationsManager />
    </div>
  );
});
