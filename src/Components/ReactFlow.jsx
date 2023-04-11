import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Viewport,
} from "reactflow";

import "reactflow/dist/style.css";

import Sidebar from "./Sidebar";
import CustomNode from "./CustomNode";
import "./index.css";

const nodeTypes = {
  custom: CustomNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const ReactFlowComponent = ({ ...workflow }) => {
  const [name, setName] = useState("");

  console.log(name, "name");

  var initNodes = [
    {
      id: "1",
      type: "input",
      data: { label: "Input Node" },
      position: { x: 250, y: 5 },
      style: {
        border: "1px solid blue",
      },
    },
  ];

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === params.target) {
          node = {
            ...node,
            style: {
              border: `1px solid blue`,
              borderRadius: "3px",
            },
          };
        }
        return node;
      })
    );

    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onEdgesDelete = useCallback((params) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === params[0].target) {
          node = {
            ...node,
            style: {
              border: `1px solid red`,
              borderRadius: "3px",
            },
          };
        }
        return node;
      })
    );

    setEdges((eds) => addEdge(params, eds));
  }, []);

  console.log(nodes, "nodes");

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const typed = event.dataTransfer.getData("application/reactflow");

      if (typeof typed === "undefined" || !typed) {
        return;
      }

      console.log(typed, "type");
      const data = JSON.parse(typed);

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type: "custom",
        position,
        data: {
          name: `${data.name}`,
          input_type: `${data.input_type}`,
          output_type: `${data.output_type}`,
        },
        style: {
          border: "1px solid red",
          borderRadius: "3px",
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  useEffect(() => {
    setName(workflow.name);
  }, []);

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            deleteKeyCode={["Backspace", "Delete"]}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onEdgesDelete={onEdgesDelete}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default ReactFlowComponent;
