"use client";

import { exportSqlMigrationCode } from "@/lib/sql/export";
import { $currentProject } from "@/lib/store/projects";
import { useUnit } from "effector-react";
import { CopyIcon, LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism-okaidia.css';
import { Button } from "./ui/button";
import { toast } from "sonner";

export function ExportCode() {
    const [isCopying, setIsCopying] = useState(false)
    const currentProject = useUnit($currentProject);

    const sqlMigrationCode = useMemo(() => {
        return currentProject ? exportSqlMigrationCode(currentProject) : "";
    }, [currentProject]);

    useEffect(() => {
        Prism.highlightAll()
    }, [sqlMigrationCode])

    async function handleCopy() {
        setIsCopying(true)
        try {
            await navigator.clipboard.writeText(sqlMigrationCode)
            toast.success("Скопировано!")
        } catch {
            toast.error("Не удалось скопировать код.")
        } finally {
            setIsCopying(false)
        }
    }

    if (!currentProject) {
        return <LoaderCircle className="animate-spin" />;
    }

    return (
        <div className="w-full">
            <div className="max-h-[60vh] overflow-auto">
                <pre className="whitespace-pre-wrap break-words m-0 !w-full">
                    <code className="language-sql block !w-full !max-w-full">{sqlMigrationCode}</code>
                </pre>
            </div>
            <Button disabled={isCopying} onClick={handleCopy} variant="outline">
                {isCopying ? <LoaderCircle className="animate-spin" /> : <CopyIcon />}
                Скопировать
            </Button>
        </div>
    );
}
