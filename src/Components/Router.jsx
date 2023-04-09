import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import IndividualWorkflow from '../Pages/IndividualWorkflow';
import ReactFlowComponent from '../Components/ReactFlow';

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/:workflowId' element={<IndividualWorkflow/>} />
                <Route path='/flow' element={<ReactFlowComponent/>} />
            </Routes>
        </div>
    );
}

export default Router;
