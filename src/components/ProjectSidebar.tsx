import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Table } from "@/lib/types/sql";
import { TableDetails } from "@/components/TableDetails";

interface ProjectSidebarProps {
    onCreateTable: () => void;
    selectedTable: Table | null;
    onTableUpdate: (table: Table) => void;
}

export function ProjectSidebar({ onCreateTable, selectedTable, onTableUpdate }: ProjectSidebarProps) {
    return (
        <aside className="h-full border-r">
            <div className="p-4">
                <Button size="lg" onClick={onCreateTable}>
                    <PlusIcon />
                    Создать таблицу
                </Button>
            </div>
            {selectedTable && (
                <TableDetails
                    table={selectedTable}
                    onUpdate={onTableUpdate}
                />
            )}
        </aside>
    );
} 