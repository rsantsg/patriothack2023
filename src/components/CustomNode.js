import { useCallback, memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function CustomNode({ data }) {
  const [popUp, setPopUs] = useState(false)
  const handleMouseEnter = () => {
    console.log("in");
    setPopUs(true)
    // You can add additional code here to modify the component's appearance on hover.
  };

  const handleMouseLeave = () => {
    console.log("out");
    setPopUs(false)
    // You can add additional code here to reset the component's appearance after hover.
  };
  let status = data.label.status === 'done' ? { backgroundColor: "green" } : { backgroundColor: "orange" };  
  if(data.label.status ==="not"){
    status = {backgroundColor: "white"}
  }


  return (

    
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="node"
      style={status}
    >
      <Handle type="target" position={Position.Left} />
      <div>
        {data.label.id}
       
      </div>
      <Handle type="source" position={Position.Right} id="a" />
      <Handle type="source" position={Position.Right} id="b" style={handleStyle} />

      {popUp ?(
      <div className='pop' style={{ position: 'absolute', top: 0, right: 0, zIndex: 1200 }}>  
             <b className="classTitle">{data.label.course}</b>   
           <div className='description'> 
            {data.label.description}
           </div> 
          
        </div>
      ) :(<></>)}
    </div>
  );
}
export default memo(CustomNode);
