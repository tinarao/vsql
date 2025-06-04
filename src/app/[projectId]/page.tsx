"use client";

import { useUnit } from "effector-react";
import { Node, useNodesState, useEdgesState, Edge, MarkerType } from "reactflow";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Table } from "@/lib/types/sql";
import {
    $currentProject,
    $projects,
    appendTable,
    updateTable,
} from "@/lib/store/projects";
import { createTable } from "@/lib/sql/fabrics/table";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { ProjectFlow } from "@/components/ProjectFlow";
import { setCurrentProjectId } from "@/lib/store/currentProjectId";
import { notFound, useParams } from "next/navigation";

export default function ProjectPageClient() {
    const { projectId } = useParams<{ projectId: string}>()

    const currentProject = useUnit($currentProject);
    const [selectedTable, setSelectedTable] = useState<string | null>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        if (projectId) {
            const idx = $projects.getState().findIndex(p => p.uuid === projectId)  
            if (idx === -1) {
                notFound()
            }
            
            setCurrentProjectId(projectId);
        }
    }, [projectId]);

    const tables = useMemo(() => currentProject?.tables || [], [currentProject]);

    useEffect(() => {
        const newNodes: Node[] = tables.map((table: Table, index: number) => ({
            id: table.uuid,
            type: "table",
            position: table.position || { x: 100 + index * 200, y: 100 },
            data: {
                table,
                isSelected: selectedTable === table.uuid,
            },
        }));
        setNodes(newNodes);

        const newEdges: Edge[] = currentProject?.relations.map(relation => ({
            id: relation.uuid,
            source: relation.sourceTableId,
            target: relation.targetTableId,
            sourceHandle: relation.sourceColumnId,
            targetHandle: relation.targetColumnId,
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#888' },
            markerEnd: {
                type: MarkerType.ArrowClosed,
            },
        })) || [];
        setEdges(newEdges);
    }, [tables, selectedTable, setNodes, currentProject?.relations, setEdges]);

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