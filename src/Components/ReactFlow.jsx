import React, { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
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
  const initNodes = [
    {
      id: "1",
      type: "input",
      data: { label: `${workflow.name}` },
      position: { x: 250, y: 5 },
    },
  ];

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [modules, setModules] = useState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const typed = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
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
          label: `${data.label}`,
          input_type: `${data.input_type}`,
          output_type: `${data.output_type}`,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const getModules = async () => {
    const data = await axios.get(
      `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=1&limit=5`
    );
    setModules(data.data);
  };
  console.log(modules, "mod");

  useEffect(() => {
    getModules();
  }, []);

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar modules={modules} />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
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
