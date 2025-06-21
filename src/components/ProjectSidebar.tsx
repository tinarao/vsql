import { Button } from "@/components/ui/button";
import { Code, PlusIcon } from "lucide-react";
import { Table } from "@/lib/types/sql";
import { TableDetails } from "@/components/TableDetails";
import { ExportSqlDialog } from "./ExportDialog";

interface ProjectSidebarProps {
    onCreateTable: () => void;
    selectedTable: Table | null;
    onTableUpdate: (table: Table) => void;
}

export function ProjectSidebar({ onCreateTable, selectedTable, onTableUpdate }: ProjectSidebarProps) {
    return (
        <aside className="h-full border-r">
            <div className="flex flex-col 2xl:flex-row gap-y-1 2xl:gap-y-0 items-center justify-between p-4">
                <Button size="lg" className="sm:w-full 2xl:w-fit" onClick={onCreateTable}>
                    <PlusIcon />
                    Создать таблицу
                </Button>
                <ExportSqlDialog>
                    <Button size="lg" className="sm:w-full 2xl:w-fit" variant="outline">
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
