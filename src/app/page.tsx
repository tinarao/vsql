'use client'

import { Button } from "@/components/ui/button";
import { createTable } from "@/lib/sql/builders/table";
import { $tables, appendTable } from "@/lib/store";
import { useUnit } from "effector-react";
import { Save } from "lucide-react";

export default function Home() {
    const tables = useUnit($tables)

    function handleCreateNewTable() {
        const t = createTable({ name: "Tabla bablba" })
        appendTable(t)
    }

    return (
        <div className="h-screen flex flex-col">
            <header className="flex items-center justify-between px-8 py-4 border-b text-xl">
                <p>
                    <span className="text-primary">v</span>sql
                </p>
                <div>
                    <Button>
                        <Save /> Сохранить
                    </Button>
                </div>
            </header>
            <div className="grid grid-cols-5 flex-1">
                <aside className="border-r h-full">
                    <Button onClick={handleCreateNewTable}>
                        Create new table
                    </Button>
                    {tables.map(t => (
                        <div key={t.uuid}>{t.name}</div>
                    ))}
                </aside>
                <main className="col-span-4">
                </main>
            </div>
        </div>
    );
}
