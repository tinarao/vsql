import { Button } from "@/components/ui/button";
import { Code, PlusIcon } from "lucide-react";
import { Table } from "@/lib/types/sql";
import { TableDetails } from "@/components/TableDetails";
import { ExportButton } from "./buttons/export-button";
import { ExportSqlDialog } from "./ExportDialog";

interface ProjectSidebarProps {
    onCreateTable: () => void;
    selectedTable: Table | null;
    onTableUpdate: (table: Table) => void;
}

export function ProjectSidebar({ onCreateTable, selectedTable, onTableUpdate }: ProjectSidebarProps) {
    return (
        <aside className="h-full border-r">
            <div className="flex items-center justify-between p-4">
                <Button onClick={onCreateTable}>
                    <PlusIcon />
                    Создать таблицу
                </Button>
                <ExportSqlDialog>
                    <Button variant="outline">
                        <Code /> Экспорт кода
                    </Button>
                </ExportSqlDialog>
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
