import React from 'react';
import Code from './Code';
import TestCases from './TestCases';

const RightSide = ({code, setCode, setCompiler}) => {

  return (
    <div className='w-[50%] flex flex-col h-full'>
      <Code code= {code} setCode={setCode} setCompiler = {setCompiler}/>
      <TestCases/>
    </div>

  );
}

export default RightSide;
