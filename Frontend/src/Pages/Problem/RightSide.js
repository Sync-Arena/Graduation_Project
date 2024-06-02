import React from 'react';
import Code from './Code';
import TestCases from './TestCases';

const RightSide = () => {
  return (
    <div className='w-[50%] flex flex-col h-full'>
      <Code />
      <TestCases />
    </div>

  );
}

export default RightSide;
