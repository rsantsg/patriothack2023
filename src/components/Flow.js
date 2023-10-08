import React, { useCallback, useMemo } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
const nodeTypes = {
  custom: CustomNode,
};
const nodeGenerator = (data)=>{


      const initialNodes = data.map((course)=>{

          const node ={
            id: course.id, 
            type:"custom"
            ,
            data:{
              label: course
            }

          }

          return  node 
            

          
        })


}


export default function  Flow ()  {
  
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
  
      
      fitView
    ></ReactFlow>
  );
};

