import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomNode from "./CustomNode";

export default () => {
  const [modules, setModules] = useState([]);
  const [page, setPage] = useState(1);

  const onDragStart = (event, nodeType) => {
    console.log(nodeType, "nodeType");
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(nodeType)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  console.log(modules.modules, "module");

  const getModules = async () => {
    const data = await axios.get(
      `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=${page}&limit=5`
    );
    setModules(data.data);
  };
  console.log(modules, "mod");

  useEffect(() => {
    getModules();
  }, [page]);

  return (
    <aside id="aside">
      <h3 className="description">Modules</h3>
      {/*   <div className="underline"></div> */}
      {modules.length > 0 ? (
        <div className="partition">
          {" "}
          <div className="modules">
            {modules.map((module) => {
              return (
                <div
                  key={module.id}
                  className="dndnode "
                  onDragStart={(event) =>
                    onDragStart(event, {
                      name: `${module.name}`,
                      input_type: `${module.input_type}`,
                      output_type: `${module.output_type}`,
                    })
                  }
                  draggable
                >
                  {module.name}
                </div>
              );
            })}
          </div>
          <div className="btngrp">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              prev
            </button>
            <strong>{page}</strong>
            <button disabled={page === 20} onClick={() => setPage(page + 1)}>
              next
            </button>
          </div>{" "}
        </div>
      ) : (
        <h3 className="loading">Loading...</h3>
      )}
    </aside>
  );
};
