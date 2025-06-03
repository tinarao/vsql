"use client";

import { useUnit } from "effector-react";
import { Node, useNodesState, useEdgesState } from "reactflow";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Table } from "@/lib/types/sql";
import {
    $projects,
    appendTable,
    updateTable,
    setCurrentProjectId,
    loadFromLocalStorage,
} from "@/lib/store/projects";
import { createTable } from "@/lib/sql/fabrics/table";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { ProjectFlow } from "@/components/ProjectFlow";

interface ProjectPageClientProps {
    projectId: string;
}

export function ProjectPageClient({ projectId }: ProjectPageClientProps) {
    const projects = useUnit($projects);

    const [selectedTable, setSelectedTable] = useState<string | null>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, _, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        loadFromLocalStorage();
    }, []);

    useEffect(() => {
        if (projectId) {
            setCurrentProjectId(projectId);
        }
    }, [projectId]);

    const currentProject = useMemo(
        () => projects.find((p) => p.uuid === projectId),
        [projects, projectId],
    );

    const tables = useMemo(() => currentProject?.tables || [], [currentProject]);

    useEffect(() => {
        const newNodes: Node[] = tables.map((table: Table, index: number) => ({
            id: table.uuid,
            type: "table",
            position: { x: 100 + index * 200, y: 100 },
            data: {
                table,
                isSelected: selectedTable === table.uuid,
            },
        }));
        setNodes(newNodes);
    }, [tables, selectedTable, setNodes]);

    const handleCreateNewTable = useCallback(() => {
        const t = createTable({ name: "Новая таблица" });
        appendTable(t);
    }, []);

    const handleNodeClick = useCallback(
        (_event: React.MouseEvent, node: Node) => {
            setSelectedTable(node.id);
        },
        [],
    );

    const handleTableUpdate = useCallback((updatedTable: Table) => {
        updateTable(updatedTable);
    }, []);

    const selectedTableData = useMemo(
        () => tables.find((t: Table) => t.uuid === selectedTable) || null,
        [tables, selectedTable],
    );

    if (!currentProject) {
        return null;
    }

    return (
        <>
            <ProjectSidebar
                onCreateTable={handleCreateNewTable}
                selectedTable={selectedTableData}
                onTableUpdate={handleTableUpdate}
            />
            <main className="col-span-3">
                <ProjectFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeClick={handleNodeClick}
                />
            </main>
        </>
    );
} 