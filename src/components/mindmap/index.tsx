import React from "react";
import { Controls, NodeOrigin, ReactFlow } from "@xyflow/react";
import useStore, { RFState } from "@/components/mindmap/store";
import "@xyflow/react/dist/style.css";
import { shallow } from "zustand/shallow";

const selector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
});

const nodeOrigin: NodeOrigin = [0.5, 0.5];

export const ReactFlowMindMap = () => {
    const { nodes, edges, onNodesChange, onEdgesChange } = useStore(selector, shallow);
    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeOrigin={nodeOrigin}
            fitView
        >
            <Controls showInteractive={false} />
        </ReactFlow>
    );
};
