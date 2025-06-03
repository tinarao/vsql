"use client";

import { Button } from "@/components/ui/button";
import { createTable } from "@/lib/sql/fabrics/table";
import { useUnit } from "effector-react";
import ReactFlow, {
    Node,
    useNodesState,
    useEdgesState,
    Controls,
    NodeChange,
    EdgeChange,
    Background,
    BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { TableNode } from "@/components/TableNode";
import { TableDetails } from "@/components/TableDetails";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Table } from "@/lib/types/sql";
import { PlusIcon } from "lucide-react";
import {
    $projects,
    appendTable,
    updateTable,
    setCurrentProjectId,
    loadFromLocalStorage,
} from "@/lib/store/projects";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";

const nodeTypes = {
    table: TableNode,
} as const;

export default function ProjectPage() {
    const params = useParams();
    const projectId = params.projectId as string;
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

    useEffect(() => {
        if (projectId && projects.length > 0 && !currentProject) {
            notFound();
        }
    }, [projectId, projects, currentProject]);

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

    const handleNodesChange = useCallback(
        (changes: NodeChange[]) => {
            onNodesChange(changes);
        },
        [onNodesChange],
    );

    const handleEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            onEdgesChange(changes);
        },
        [onEdgesChange],
    );

    const selectedTableData = useMemo(
        () => tables.find((t: Table) => t.uuid === selectedTable) || null,
        [tables, selectedTable],
    );

    if (!currentProject) {
        return null;
    }

    return (
        <>
            <aside className="h-full border-r">
                <div className="p-4">
                    <Button size="lg" onClick={handleCreateNewTable}>
                        <PlusIcon />
                        Создать таблицу
                    </Button>
                </div>
                {selectedTableData && (
                    <TableDetails
                        table={selectedTableData}
                        onUpdate={handleTableUpdate}
                    />
                )}
            </aside>
            <main className="col-span-3">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={handleNodesChange}
                    onEdgesChange={handleEdgesChange}
                    onNodeClick={handleNodeClick}
                    nodeTypes={nodeTypes}
                    fitView
                    minZoom={0.1}
                    maxZoom={2}
                    defaultViewport={{ x: 0, y: 0, zoom: 1 }}
                >
                    <Background variant={BackgroundVariant.Dots} />
                    <Controls />
                </ReactFlow>
            </main>
        </>
    );
}
