"use client"

import { $currentProject } from "@/lib/store/projects";
import { useUnit } from "effector-react"
import Link from "next/link";

export function CurrentProjectName() {
    const currentProject = useUnit($currentProject);

    return (
        <Link href={currentProject?.uuid || "/"}>
            {currentProject?.name || 'Проект не выбран'}
        </Link>
    );
}
