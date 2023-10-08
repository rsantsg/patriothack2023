import Dagre from '@dagrejs/dagre';
import React, { useEffect,useCallback, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from 'reactflow';

import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import { mapEdges } from './mapData';
const generateEdges = () => {
  const initialEdges = [];

  mapEdges.forEach((course) => {
    if (course.requisites.length > 0) {
      course.requisites.forEach((req) => {
        initialEdges.push({
          id: `e${course.id}${req}`,
          source: req,
          target: course.id,
          animated: true,
        });
      });
    }
  });

  return initialEdges;
};

console.log("edges")
const initialEdge = [
  { id: 'e12', source: 'cs110', target: 'cs211', animated: true },
  { id: 'e13', source: 'cs211', target: 'cs310', animated: true },
  { id: 'e22a', source: "Computer Sciences", target: 'cs110', animated: true },
  { id: 'e22b', source: "Computer Sciences", target: 'cs112', animated: true },
  { id: 'e22c', source: 'cs112', target: 'cs262', animated: true },
  { id: 'e2c2d', source: 'cs262', target: 'cs367', animated: true },
  { id: '12', source:"cs310", target:"cs330", animated:false}, 

  { id: '122', source:"cs211", target:"cs321", animated:false},
  { id: '122', source:"cs110", target:"cs367", animated:false},
  { id: '122', source:"cs367", target:"cs471", animated:false},
  { id: '122', source:"cs310", target:"cs471", animated:false},
  { id: '122', source:"cs310", target:"cs483", animated:false},
  { id: '122', source:"cs330", target:"cs483", animated:false},
  { id: '122', source:"cs310", target:"cs455", animated:false},
  { id: '122', source:"cs367", target:"cs455", animated:false},
  { id: '122', source:"cs310", target:"cs468", animated:false},
  { id: '122', source:"cs367", target:"cs468", animated:false},
  { id: '122', source:"cs310", target:"cs475", animated:false},
  { id: '122', source:"cs367", target:"cs475", animated:false},
  { id: '122', source:"cs310", target:"cs450", animated:false},
  { id: '122', source:"cs367", target:"cs450", animated:false},









];
// const axios = require('axios');

// const fetchData = async () => {

//   console.log("Fetching Data")

//   try {
//     const response = await axios.get();
//     // Assuming resp.data is an array of data you want to handle
//     //console.log(response)
//     if(response.status ===200){
//       const data = {
//           name: response.data
//       }

      


//     }
   
//   } catch (error) {
//       console.log(error )
//   } 
// };

const nodeTypes = {
  custom: CustomNode,
};

const data = 

[ {'id': "Computer Sciences"}
  ,
  {
      "id": "cs110",
      "course": "Essentials of Computer Science",
      "prerequisite": [[]],
      "alternitive": [[]],
      "description": "Offers a broad overview of computer science designed to provide computer science majors with an introduction to their discipline. Fundamental computing concepts such as number representation, programming environments, communication tools, and basic network security measures are covered. Privacy and ethical use of computing are also discussed along with guest lectures to sample current computer science research. Note: All computer science majors are required to take this course within their first year as a computer science major. Offered by Computer Science. Limited to two attempts.",
      "credits": 3,
      "status": "done"
  },
  {
      "id": "cs112",
      "course": "Introduction to Computer Programming",
      "prerequisite": [["1", "Math104"], ["1", "Math104T"], ["1", "Math105"], ["1", "Math105T"], ["1", "Math113"], ["1", "Math115"], ["1", "Math123"]],
      "alternitive": [["1", "CS108"],["1", "CS109"]],
      "description": "Rigorous introduction to problem solving through development of computer programs. Focuses on identifying algorithmic patterns in problems, describing problem solutions in high-level pseudocode, then implementing in a procedural programming language. Basic programming concepts are covered in detail including expressions, control structures, simple data types, and input/output. Program testing and debugging are discussed to verify that problems are solved correctly. Note: The department will drop students who fail to meet the prerequisites. Lectures and Labs are offered in groups. Students MUST register for a lecture and a lab from the same group. Offered by Computer Science. Limited to two attempts.",
      "credits": 4,
      "status": "done"
  },
  {
      "id": "cs211",
      "course": "Object-Oriented Programming",
      "prerequisite": [["1","cs112"], ["1","cs109"]],
      "alternitive": [[]],
      "description": "Thorough treatment of programming according to object-oriented principles. Introduces classes, interfaces, inheritance, polymorphism, and single dispatch as means to decompose problems. Covers intermediate programming techniques including error handling through exceptions, arrangement of source code into packages, and simple data structures. Intermediate debugging techniques and unit testing are covered. Note: Lectures and labs are offered in groups. Students MUST register for a lecture and a lab from the same group. Offered by Computer Science. Limited to two attempts.",
      "credits": 3,
      "status": "done"
  },
  {
      "id": "cs262",
      "course": "Introduction to Low-Level Programming",
      "prerequisite": [["1","cs110"], ["1", "cs101"], ["2","cs211"], ["2", "cs222"]],
      "alternitive": [[]],
      "description": "Introduction to the language C, as well as operating system concepts, in UNIX, to prepare students for topics in systems programming. Offered by Computer Science. Limited to two attempts.",
      "credits": 3,
      "status": "progress"
  },
  {
      "id": "cs310",
      "course": "Data Structures",
      "prerequisite": [["1", "cs211"], ["2", "math125"], ["2","math113"],["3","math124"], ["3", "math115"]],
      "alternitive": [[]],
      "description": "Focuses on object-oriented programming with an emphasis on tools and techniques for developing moderate to large programs. Topics include use and implementation of linear and nonlinear data structures and the design and analysis of elementary algorithms. Offered by Computer Science. Limited to two attempts.",
      "credits": 3,
      "status": "progress"
  },
  {
      "id": "cs321",
      "course": "Software Engineering",
      "prerequisite": [["1","cs310"],["2","engh302"]],
      "alternitive": [[]],
      "description": "An introduction to concepts, methods, and tools for the creation of large-scale software systems. Methods, tools, notations, and validation techniques to analyze, specify, prototype, and maintain software requirements. Introduction to object-oriented requirements modeling, including use of case modeling, static modeling, and dynamic modeling using the Unified Modeling Language (UML) notation. Concepts and methods for the design of large-scale software systems. Fundamental design concepts and design notations are introduced. A study of object-oriented analysis and design modeling using the UML notation. Students participate in a group project on software requirements, specification, and object-oriented software design. Offered by Computer Science. Limited to two attempts.",
      "credits": 3,
      "status": "not"
  },
  {
      "id": "cs330",
      "course": "Formal Methods and Models",
      "prerequisite": [["1","cs211"],["2","math125"]],
      "alternitive": [[]],
      "description": "Abstract concepts that underlie much advanced work in computer science, with major emphasis on formal languages, models of computation, logic, and proof strategies. Offered by Computer Science. Limited to two attempts.",
      "credits": 3,
      "status": "not"
  },
  {
      "id": "cs367",
      "course": "Computer Systems and Programming",
      "prerequisite": [["1","cs262"],["1","cs222"],["2", "math125"],["3","cs110"]],
      "alternitive": [[]],
      "description": "Introduces students to computer systems from a programmer's perspective. Topics include data representation, assembly and machine-level representation of high-level language programs, the memory hierarchy, linking, exceptions, interrupts, processes and signals, virtual memory, and system-level I/O. Foundation for courses on compilers; networks; operating systems; and computer architecture, where a deeper understanding of systems-level issues is required. Offered by Computer Science. Limited to two attempts.",
      "credits": 4,
      "status": "not"
  },
  {
      "id": "cs471",
      "course": "Operating Systems",
      "prerequisite": [["1","cs310"],["2","cs367"]],
      "alternitive": [[]],
      "description": "Issues in multiprogramming. Covers concurrent processes and synchronization mechanisms; processor scheduling; memory, file, I/O, and deadlock management; performance of operating systems; and projects dealing with synchronization in multiprogrammed OS and virtual memory management. Offered by Computer Science. Limited to two attempts.",
      "credits": 3,
      "status": "not"
  },
  {
      "id": "cs483",
      "course": "Analysis of Algorithms",
      "prerequisite": [["1", "cs310"],["2","cs330"],["3","math125"]],
      "alternitive": [[]],
      "description": "Analyzes computational resources for important problem types by alternative algorithms and their associated data structures, using mathematically rigorous techniques. Specific algorithms analyzed and improved. Offered by Computer Science. Limited to two attempts.",
      "credits": 3,
      "status": "not"
  },
  {
      "id": "cs455",
      "course": "Computer Communications and Networking",
      "prerequisite": [["1","cs310"],["2","cs367"],["3","stat344"]],
      "alternitive": [[]],
      "description": "Data communications and networking protocols, with study organized to follow layers of Internet Protocol Suite (TCP/IP family of protocols). Topics include role of various media and software components, local and wide area network protocols, network performance, and emerging advanced commercial technologies. Offered by Computer Science. Limited to two attempts.",
      "credits": 3,
      "status": "not"

  },
  {
      "id": "cs450",
      "course": "Database Concepts",
      "prerequisite": [["1","cs310"],["2","cs330"]],
      "alternitive": [[]],
      "description": "Covers basics to intermediate knowledge for the design, implementation, and use of relational database systems. Topics include the Entity-Relationship (ER) and Entity-Enhanced Relationship (EER) models for database design, Relational Algebra (RA), Structured Query Language (SQL), SQL programming techniques, functional dependencies and normalization, object and object-relational databases, and security. Students will practice to design, develop, and implement a relational ORACLE database and use the database for queries, transaction processing, and report generation. Offered by Computer Science. Limited to two attempts.",
      "credits": 3,
      "status": "not"
  },
]


const initialNode = [
  {
    id: '1',
    type: 'custom',
    data: { label: 'CS 110' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'custom',

    data: { label: 'node 2' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2a',
    data: { label: 'node 2a' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2b',
    data: { label: 'node 2b' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2c',
    data: { label: 'node 2c' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2d',
    data: { label: 'node 2d' },
    position: { x: 0, y: 0 },
  },
  {
    id: '3',
    data: { label: 'node 3' },
    position: { x: 0, y: 0 },
  },
];
// const generateEdges = (data)=>{
//   const id =   new Date().toString()
//   const initialEdges = data.map(
//     (course) =>{

//     }
//   )
// }


const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, options) => {
  g.setGraph({ rankdir: 'LR', ranksep: 200, edgesep:100 }); // 'TB' stands for top-to-bottom layout

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const nodeGenerator = (data)=>{


  const initialNodes = data.map((course)=>{

      const node ={
        id: course.id, 
        type:"custom"
        ,
        data:{
          label: course
        }, 
        position: { x: 0, y: 0 },


      }

      return  node 
        

      
    })
    return initialNodes 


}

const LayoutFlow = () => {
  const [initialNodes, setInitialNodes] = useState(nodeGenerator(data));
  const [initialEdges, setInitialEdges] = useState()
 
  //const [ initialNodes, setInitiaNode] = useState([])



  console.log(typeof initialNodes)
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdge);
  const onLayout = useCallback(
    (direction) => {
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges]
  );
  console.log(initialEdges)
  useEffect(() => {
    onLayout('TB');
    //setInitiaNode(nodeGenerator(data))
    
  }, []);
  console.log(initialNodes)
  if (initialNodes.length === 0) {
    // Return some loading indicator or a message
    return <div>Loading...</div>;
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}

      fitView
    >
      <Panel position="top-right">

      </Panel>
    </ReactFlow>
  );
};



export default function () {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
