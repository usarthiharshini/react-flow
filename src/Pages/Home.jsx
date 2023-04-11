import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [workflows, setWorkflows] = useState([]);

  console.log(workflows);

  const getWorkflows = async () => {
    const data = await axios.get(
      `https://64307b10d4518cfb0e50e555.mockapi.io/workflow`
    );
    setWorkflows(data.data);
  };

  useEffect(() => {
    getWorkflows();
  }, []);

  return (
    <main>
      <section className=" section">
        <div className="title">
          <h3>Workflows</h3>
          <div className="underline"></div>
        </div>
      </section>
      <section className="section">
        <table className="workflows">
          <tr>
            <th>Name</th>
            <th>Input Type</th>
            <th>Created At</th>
          </tr>
          {workflows.map((workflow) =>{
            return <tr>
                <td><a href={`/${workflow.id}`}>{workflow.name}</a></td>
                <td className="input-type">{workflow.input_type}</td>
                <td>{workflow.createdAt}</td>
            </tr>
          })}
        </table>
      </section>
    </main>
  );
};

export default Home;
