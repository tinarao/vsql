'use client'

import { $currentProject } from "@/lib/store/projects";
import { useUnit } from "effector-react"
import { Button } from "./ui/button";
import { TableConfig } from "lucide-react";
import { useEffect, useState } from "react";

export function CurrentProjectName() {
    const currentProject = useUnit($currentProject);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Button variant="outline" className="hover:bg-background" asChild>
            <span>
                <TableConfig />
                {currentProject?.name || 'Проект не выбран'}
            </span>
        </Button>
    )
}
