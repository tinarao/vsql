import { useUnit } from "effector-react";
import {
  $currentProject,
  addRelation,
  removeRelation,
} from "@/lib/store/projects";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Trash, PlusIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { Relation } from "@/lib/types/sql";

export function RelationsManager() {
  const currentProject = useUnit($currentProject);
  const tables = currentProject?.tables || [];
  const relations = currentProject?.relations || [];

  const [sourceTableId, setSourceTableId] = useState("");
  const [sourceColumnId, setSourceColumnId] = useState("");
  const [targetTableId, setTargetTableId] = useState("");
  const [targetColumnId, setTargetColumnId] = useState("");
  const [type, setType] = useState<Relation["type"]>("ONE_TO_MANY");

  function resetForm() {
    setSourceTableId("");
    setSourceColumnId("");
    setTargetTableId("");
    setTargetColumnId("");
    setType("ONE_TO_MANY");
  }

  function getTableName(id: string) {
    return tables.find((t) => t.uuid === id)?.name || "?";
  }
  function getColumnName(tableId: string, columnId: string) {
    return (
      tables
        .find((t) => t.uuid === tableId)
        ?.columns.find((c) => c.uuid === columnId)?.name || "?"
    );
  }

  const sourceColumns = useMemo(
    () => tables.find((t) => t.uuid === sourceTableId)?.columns || [],
    [tables, sourceTableId],
  );
  const targetColumns = useMemo(
    () => tables.find((t) => t.uuid === targetTableId)?.columns || [],
    [tables, targetTableId],
  );

  function handleAddRelation() {
    if (
      !sourceTableId ||
      !sourceColumnId ||
      !targetTableId ||
      !targetColumnId ||
      (sourceTableId === targetTableId && sourceColumnId === targetColumnId)
    )
      return;
    addRelation({
      sourceTableId,
      sourceColumnId,
      targetTableId,
      targetColumnId,
      type,
    });
    resetForm();
  }

  function handleRemoveRelation(uuid: string) {
    removeRelation(uuid);
  }

  return (
    <div className="space-y-4 py-4">
      <h3 className="font-medium">Отношения</h3>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span className="font-medium">Список связей</span>
        </div>
        <UITable>
          <TableHeader>
            <TableRow>
              <TableHead>Источник</TableHead>
              <TableHead>Цель</TableHead>
              <TableHead>Тип</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {relations.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-muted-foreground text-center"
                >
                  Нет связей
                </TableCell>
              </TableRow>
            )}
            {relations.map((rel) => (
              <TableRow key={rel.uuid}>
                <TableCell>
                  {getTableName(rel.sourceTableId)}.
                  {getColumnName(rel.sourceTableId, rel.sourceColumnId)}
                </TableCell>
                <TableCell>
                  {getTableName(rel.targetTableId)}.
                  {getColumnName(rel.targetTableId, rel.targetColumnId)}
                </TableCell>
                <TableCell>
                  {rel.type === "ONE_TO_ONE"
                    ? "One to one"
                    : rel.type === "ONE_TO_MANY"
                      ? "One to many"
                      : "Many to many"}
                </TableCell>
                <TableCell>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-red-500 hover:text-white"
                    onClick={() => handleRemoveRelation(rel.uuid)}
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </UITable>
      </div>
      <div>
        <div className="mb-2 font-medium">Добавить связь</div>
        <div className="flex flex-wrap items-end gap-2">
          <div>
            <div className="mb-1 text-xs">Таблица-источник</div>
            <Select value={sourceTableId} onValueChange={setSourceTableId}>
              <SelectTrigger className="min-w-32">
                <SelectValue placeholder="Выбрать" />
              </SelectTrigger>
              <SelectContent>
                {tables.map((t) => (
                  <SelectItem key={t.uuid} value={t.uuid}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="mb-1 text-xs">Колонка-источник</div>
            <Select
              value={sourceColumnId}
              onValueChange={setSourceColumnId}
              disabled={!sourceTableId}
            >
              <SelectTrigger className="min-w-32">
                <SelectValue placeholder="Выбрать" />
              </SelectTrigger>
              <SelectContent>
                {sourceColumns.map((c) => (
                  <SelectItem key={c.uuid} value={c.uuid}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="mb-1 text-xs">Таблица-цель</div>
            <Select value={targetTableId} onValueChange={setTargetTableId}>
              <SelectTrigger className="min-w-32">
                <SelectValue placeholder="Выбрать" />
              </SelectTrigger>
              <SelectContent>
                {tables.map((t) => (
                  <SelectItem key={t.uuid} value={t.uuid}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="mb-1 text-xs">Колонка-цель</div>
            <Select
              value={targetColumnId}
              onValueChange={setTargetColumnId}
              disabled={!targetTableId}
            >
              <SelectTrigger className="min-w-32">
                <SelectValue placeholder="Выбрать" />
              </SelectTrigger>
              <SelectContent>
                {targetColumns.map((c) => (
                  <SelectItem key={c.uuid} value={c.uuid}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="mb-1 text-xs">Тип</div>
            <Select
              value={type}
              onValueChange={(v) => setType(v as Relation["type"])}
            >
              <SelectTrigger className="min-w-24">
                <SelectValue placeholder="Тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ONE_TO_ONE">One to one</SelectItem>
                <SelectItem value="ONE_TO_MANY">One to many</SelectItem>
                <SelectItem value="MANY_TO_MANY">Many to many</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="ml-2"
            variant="outline"
            onClick={handleAddRelation}
            disabled={
              !sourceTableId ||
              !sourceColumnId ||
              !targetTableId ||
              !targetColumnId ||
              (sourceTableId === targetTableId &&
                sourceColumnId === targetColumnId)
            }
          >
            <PlusIcon className="mr-1" /> Добавить
          </Button>
        </div>
      </div>
    </div>
  );
}
