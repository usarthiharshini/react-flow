import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import ReactFlowComponent from "../Components/ReactFlow";

const IndividualWorkflow = () => {
  const { workflowId } = useParams();
  const initWorkflow = {
    name: "",
    id: "",
  };

  const [workflow, setWorkflow] = useState(initWorkflow);

  const getWorkflow = async () => {
    const data = await axios.get(
      `https://64307b10d4518cfb0e50e555.mockapi.io/workflow/${workflowId}`
    );
    setWorkflow(data.data);
  };

  console.log(workflow);

  useEffect(() => {
    getWorkflow();
  }, []);

  return (
    <main>
      <section className=" section">
        <div className="title">
          <h3>Workflow Name : {workflow.name}</h3>
          <div className="underline"></div>
        </div>
      </section>
      <section className=" section">
        <ReactFlowComponent {...workflow} />
      </section>
    </main>
  );
};

export default IndividualWorkflow;
