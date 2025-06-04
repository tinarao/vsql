"use client";

import { exportSqlMigrationCode } from "@/lib/sql/export";
import { $currentProject, loadFromLocalStorage } from "@/lib/store/projects";
import { useUnit } from "effector-react";
import { LoaderCircle } from "lucide-react";
import { useEffect, useMemo } from "react";

export function ExportCode() {
    const currentProject = useUnit($currentProject);

    useEffect(() => {
        loadFromLocalStorage();
    }, []);

    const sqlMigrationCode = useMemo(() => {
        return currentProject ? exportSqlMigrationCode(currentProject) : "";
    }, [currentProject]);

    if (!currentProject) {
        return <LoaderCircle className="animate-spin" />;
    }

    return <pre>{sqlMigrationCode || "Проект не выбран"}</pre>;
}
