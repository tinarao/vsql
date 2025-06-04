import ReactFlow, {
    Node,
    Edge,
    Controls,
    NodeChange,
    EdgeChange,
    Background,
    BackgroundVariant,
    Connection,
    addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { TableNode } from "@/components/TableNode";
import { useUnit } from "effector-react";
import { $currentProject, addRelation, updateTable } from "@/lib/store/projects";
import { useCallback } from "react";

const nodeTypes = {
    table: TableNode,
} as const;

interface ProjectFlowProps {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    onNodeClick: (event: React.MouseEvent, node: Node) => void;
}

export function ProjectFlow({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onNodeClick,
}: ProjectFlowProps) {
    const currentProject = useUnit($currentProject);

    const handleNodesChange = useCallback(
        (changes: NodeChange[]) => {
            onNodesChange(changes);
            
            changes.forEach((change) => {
                if (change.type === 'position' && change.position) {
                    const node = nodes.find((n) => n.id === change.id);
                    if (node && currentProject) {
                        const table = currentProject.tables.find((t) => t.uuid === node.id);
                        if (table) {
                            updateTable({
                                ...table,
                                position: change.position,
                            });
                        }
                    }
                }
            });
        },
        [nodes, currentProject, onNodesChange]
    );

    const onConnect = useCallback(
        (connection: Connection) => {
            if (!connection.source || !connection.target || !connection.sourceHandle || !connection.targetHandle) return;

            addRelation({
                sourceTableId: connection.source,
                sourceColumnId: connection.sourceHandle,
                targetTableId: connection.target,
                targetColumnId: connection.targetHandle,
                type: 'ONE_TO_MANY',
            });
        },
        []
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.1}
            maxZoom={2}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        >
            <Background variant={BackgroundVariant.Dots} />
            <Controls />
        </ReactFlow>
    );
} 