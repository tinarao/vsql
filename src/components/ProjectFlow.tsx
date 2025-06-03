import ReactFlow, {
    Node,
    Edge,
    Controls,
    NodeChange,
    EdgeChange,
    Background,
    BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { TableNode } from "@/components/TableNode";

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
    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
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