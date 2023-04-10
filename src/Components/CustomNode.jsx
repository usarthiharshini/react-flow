import { memo } from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data }) => {
  return (
    <div className="node">
      <span className="input"> {data.input_type} </span>
      <div
        style={{ backgroundColor: "hsl(212, 33%, 89%)", padding: "0 0.3rem" }}
      >
        {data.name}
      </div>
      <span className="input"> {data.output_type} </span>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(CustomNode);
