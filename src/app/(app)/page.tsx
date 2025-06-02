'use client'

import { Button } from "@/components/ui/button";
import { createTable } from "@/lib/sql/builders/table";
import { $tables, appendTable, loadFromLocalStorage, updateTable } from "@/lib/store";
import { useUnit } from "effector-react";
import ReactFlow, { Node, useNodesState, useEdgesState, Controls, NodeChange, EdgeChange, Background, BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';
import { TableNode } from '@/components/TableNode';
import { TableDetails } from '@/components/TableDetails';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Table } from '@/lib/types/sql';
import { PlusIcon } from "lucide-react";

const nodeTypes = {
    table: TableNode,
} as const;

export default function Home() {
    const tables = useUnit($tables);
    const [selectedTable, setSelectedTable] = useState<string | null>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);

    const [edges, _, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        loadFromLocalStorage()
    }, [])

    useEffect(() => {
        const newNodes: Node[] = tables.map((table: Table, index: number) => ({
            id: table.uuid,
            type: 'table',
            position: { x: 100 + index * 200, y: 100 },
            data: {
                table,
                isSelected: selectedTable === table.uuid
            },
        }));
        setNodes(newNodes);
    }, [tables, selectedTable, setNodes]);

    const handleCreateNewTable = useCallback(() => {
        const t = createTable({ name: "Новая таблица" });
        appendTable(t);
    }, []);

    const handleNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
        setSelectedTable(node.id);
    }, []);

    const handleTableUpdate = useCallback((updatedTable: Table) => {
        updateTable(updatedTable);
    }, []);

    const handleNodesChange = useCallback((changes: NodeChange[]) => {
        onNodesChange(changes);
    }, [onNodesChange]);

    const handleEdgesChange = useCallback((changes: EdgeChange[]) => {
        onEdgesChange(changes);
    }, [onEdgesChange]);

    const selectedTableData = useMemo(() =>
        tables.find((t: Table) => t.uuid === selectedTable) || null
        , [tables, selectedTable]);

    return (
        <>
            <aside className="border-r h-full">
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
