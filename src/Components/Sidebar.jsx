import React from "react";

export default ({modules}) => {
  const onDragStart = (event, nodeType) => {
    console.log(nodeType,"nodeType")
    event.dataTransfer.setData("application/reactflow", JSON.stringify(nodeType));
    event.dataTransfer.effectAllowed = "move";
  };

  console.log(modules.modules, "module");

  return (
    <aside id="aside">
      <h3 className="description">Modules</h3>
      <div className="underline"></div>
      <div className="modules">
        {modules.map((module) => {
          return (
            <div
            key={module.id}
              className="dndnode"
              onDragStart={(event) => onDragStart(event, {label:`${module.name}`,input_type:`${module.input_type}`,output_type:`${module.output_type}`})}
              draggable
            >
              {module.name}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
