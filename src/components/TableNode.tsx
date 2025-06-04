import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Table } from "@/lib/types/sql";
import { cn } from "@/lib/utils";
import { TableIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { memo, useCallback } from "react";
import { removeTable } from "@/lib/store/projects";
import { toast } from "sonner";
import { Handle, Position } from "reactflow";

interface TableNodeProps {
    data: {
        table: Table;
        isSelected: boolean;
    };
}

function TableNodeComponent({ data }: TableNodeProps) {
    const { table, isSelected } = data;

    function handleRemoveTable() {
        try {
            removeTable(data.table.uuid)
            toast.success(`Таблица "${data.table.name}" удалена!`)
        } catch {
            toast.error("Не удалось удалить таблицу")
        }
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div
                    className={cn(
                        "bg-background w-fit min-w-60 rounded-lg border",
                        isSelected ? "border-primary shadow-lg" : "border-border",
                    )}
                >
                    <p className="flex items-center gap-x-2 border-b px-4 py-2">
                        <TableIcon size={16} /> {table.name}
                    </p>
                    <div className="space-y-1 px-4 py-2">
                        {table.columns &&
                            table.columns.map((c) => (
                                <div
                                    key={c.uuid}
                                    className="flex items-center justify-between gap-x-4 group relative"
                                >
                                    <Handle
                                        type="source"
                                        position={Position.Right}
                                        id={c.uuid}
                                        className="!w-3 !h-3 !bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                    <Handle
                                        type="target"
                                        position={Position.Left}
                                        id={c.uuid}
                                        className="!w-3 !h-3 !bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                    <p 
                                        className="cursor-pointer hover:text-primary"
                                    >
                                        {c.name}
                                    </p>
                                    <div className="space-x-1">
                                        {c.isPK && <Badge className="bg-purple-500">PK</Badge>}
                                        {c.isUnique && <Badge className="bg-green-500">UNIQUE</Badge>}
                                        <Badge>{c.sqlType}</Badge>
                                        {!c.isNullable && (
                                            <Badge className="bg-orange-500">NOT NULL</Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onClick={handleRemoveTable}>Удалить</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}

export const TableNode = memo(TableNodeComponent);
