import { memo } from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => {
  return (
    <>
     
      <div style={{ padding: '10px 20px',border:'1px solid black',borderRadius:'3px' }}>
        <span style={{backgroundColor:'yellow'}} >{data.input_type} </span>
        {data.label}
        <span> {data.output_type}</span>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default memo(CustomNode);
