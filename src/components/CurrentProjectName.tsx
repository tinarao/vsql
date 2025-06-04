"use client"

import { $currentProject } from "@/lib/store/projects";
import { useUnit } from "effector-react"

export function CurrentProjectName() {
    const currentProject = useUnit($currentProject);
    return currentProject?.name || 'Проект не выбран'
}
