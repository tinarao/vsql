'use client'

import { Button } from "@/components/ui/button";
import { createTable } from "@/lib/sql/builders/table";
import { $tables, appendTable, loadFromLocalStorage, saveToLocalStorage, updateTable } from "@/lib/store";
import { useUnit } from "effector-react";
import { Save } from "lucide-react";
import ReactFlow, { Node, useNodesState, useEdgesState, Controls, NodeChange, EdgeChange } from 'reactflow';
import 'reactflow/dist/style.css';
import { TableNode } from '@/components/TableNode';
import { TableDetails } from '@/components/TableDetails';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Table } from '@/lib/types/sql';

const nodeTypes = {
    table: TableNode,
} as const;

export default function Home() {
    const tables = useUnit($tables);
    const [selectedTable, setSelectedTable] = useState<string | null>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

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

    const handleSave = useCallback(() => {
        saveToLocalStorage(tables);
    }, [tables]);

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
        <div className="h-screen flex flex-col">
            <header className="flex items-center justify-between px-8 py-4 border-b text-xl">
                <p>
                    <span className="text-primary">v</span>sql
                </p>
                <div>
                    <Button onClick={handleSave}>
                        <Save /> Сохранить
                    </Button>
                </div>
            </header>
            <div className="grid grid-cols-5 flex-1">
                <aside className="border-r h-full">
                    <div className="p-4 border-b">
                        <Button onClick={handleCreateNewTable}>
                            Создать таблицу
                        </Button>
                    </div>
                    <TableDetails
                        table={selectedTableData}
                        onUpdate={handleTableUpdate}
                    />
                </aside>
                <main className="col-span-4">
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
                        <Controls />
                    </ReactFlow>
                </main>
            </div>
        </div>
    );
}
