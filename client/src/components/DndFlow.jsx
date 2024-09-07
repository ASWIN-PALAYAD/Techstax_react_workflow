import { useRef, useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import Sidebar from "./Sidebar";
import { useDnD } from "../context/DnDContex";

import "../index.css";
import axios from "axios";

// const initialNodes = [
//   {
//     id: "1",
//     type: "input",
//     data: { label: "input node" },
//     position: { x: 250, y: 5 },
//   },
// ];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

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

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  const saveWorkflow = async () => {
    const workflow = { nodes, edges };
    try {
      const res = await axios.post("http://localhost:5000/api/flow", workflow);
      setEdges([])
      setNodes([])
      alert("Workflow saved");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="dndflow"
      style={{ width: "100%", height: "calc(100vh - 100px)" }}
    >
      <Sidebar />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <div className="save_flow">
            <p>workflow Id: afoafaoalfa</p>
            <button onClick={saveWorkflow} className="saveFlow_button">
              Save Workflow
            </button>
          </div>
          <Controls />
          <Background color="red" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default DnDFlow;
