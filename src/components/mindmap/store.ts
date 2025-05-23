import {
    applyEdgeChanges,
    applyNodeChanges,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    OnEdgesChange,
    OnNodesChange,
} from "@xyflow/react";
import { createWithEqualityFn } from "zustand/traditional";

export type RFState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    setElements: (nodes: Node[], edges: Edge[]) => void;
};
const useStore = createWithEqualityFn<RFState>((set, get) => ({
    nodes: [],
    edges: [],
    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    setElements: (nodes: Node[], edges: Edge[]) => {
        set({ nodes, edges });
    },
}));

export default useStore;
