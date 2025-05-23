export const generateElementsFromJson = (data) => {
    const nodes = data.nodes.map((node) => ({
        id: node.id,
        type: node.type || "mindmap",
        data: { label: node.data.label },
        position: node.position,
    }));

    const edges = data.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type || "default",
        animated: false, // optional, set true for animated edges
    }));

    // return [...nodes, ...edges];
    return {
        nodes,
        edges,
    };
};
