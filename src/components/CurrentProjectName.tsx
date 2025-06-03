"use client"

import { $currentProjectId, $projects } from "@/lib/store/projects"
import { useUnit } from "effector-react"
import { useMemo } from "react";

export function CurrentProjectName() {
    const currentProjectId = useUnit($currentProjectId)
    const projects = useUnit($projects)

    const currentProject = useMemo(
        () => projects.find((p) => p.uuid === currentProjectId),
        [projects, currentProjectId],
    );

    return (
        <p>
            {currentProject?.name}
        </p>
    )
}
