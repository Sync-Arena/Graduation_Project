import React from 'react';
import Code from './Code';
import TestCases from './TestCases';

const RightSide = (props) => {

  return (
    <div className='w-[50%] flex flex-col h-full'>
      <Code />
      <TestCases problem = {props.problem}/>
    </div>

  );
}

export default RightSide;
