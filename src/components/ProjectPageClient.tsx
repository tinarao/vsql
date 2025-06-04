"use client";

import { useUnit } from "effector-react";
import { Node, useNodesState, useEdgesState } from "reactflow";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Table } from "@/lib/types/sql";
import {
    $currentProject,
    appendTable,
    updateTable,
} from "@/lib/store/projects";
import { createTable } from "@/lib/sql/fabrics/table";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { ProjectFlow } from "@/components/ProjectFlow";
import { setCurrentProjectId } from "@/lib/store/currentProjectId";

interface ProjectPageClientProps {
    projectId: string;
}

export function ProjectPageClient({ projectId }: ProjectPageClientProps) {
    const currentProject = useUnit($currentProject);
    const [selectedTable, setSelectedTable] = useState<string | null>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, _, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        if (projectId) {
            setCurrentProjectId(projectId);
        }
    }, [projectId]);

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

    const handleTableAction = useCallback((action: 'create' | 'update' | 'select', table?: Table) => {
        switch (action) {
            case 'create':
                const newTable = createTable({ name: "Новая таблица" });
                appendTable(newTable);
                break;
            case 'update':
                if (table) updateTable(table);
                break;
            case 'select':
                if (table) setSelectedTable(table.uuid);
                break;
        }
    }, []);

    const handleNodeClick = useCallback(
        (_event: React.MouseEvent, node: Node) => {
            handleTableAction('select', { uuid: node.id } as Table);
        },
        [handleTableAction],
    );

    const selectedTableData = useMemo(
        () => tables.find((t: Table) => t.uuid === selectedTable) || null,
        [tables, selectedTable],
    );

    return (
        <>
            <ProjectSidebar
                onCreateTable={() => handleTableAction('create')}
                selectedTable={selectedTableData}
                onTableUpdate={(table) => handleTableAction('update', table)}
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
