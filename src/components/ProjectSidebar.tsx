import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Table } from "@/lib/types/sql";
import { TableDetails } from "@/components/TableDetails";
import { ExportButton } from "./buttons/export-button";

interface ProjectSidebarProps {
    onCreateTable: () => void;
    selectedTable: Table | null;
    onTableUpdate: (table: Table) => void;
}

export function ProjectSidebar({ onCreateTable, selectedTable, onTableUpdate }: ProjectSidebarProps) {
    return (
        <aside className="h-full border-r">
            <div className="flex items-center justify-between p-4">
                <Button size="lg" onClick={onCreateTable}>
                    <PlusIcon />
                    Создать таблицу
                </Button>
                <ExportButton />
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
