import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';
import './style/Output.css';
import Code from './code/Code';

const Output = ({ content, isDark }) => {
  return (
    <div className='output-container'>
      <Markdown
        className='output'
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        children={content}
        components={{
          pre: ({ children: codeChildren }) => {
            const codeContent =
              React.Children.toArray(codeChildren).find(
                (child) => React.isValidElement(child) && child.type === 'code'
              )?.props.children || '';

            const lang =
              /language-(\w+)/.exec(
                React.Children.toArray(codeChildren).find(
                  (child) => React.isValidElement(child) && child.type === 'code'
                )?.props.className || ''
              )?.[1] || '';

            return (
              <Code known={lang ? 1 : 0} children={codeContent} lang={lang} isDark={isDark} />
            );
          },
          table: ({ children: tableChildren }) => (
            <div className="table-container">
              <table>{tableChildren}</table>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default Output;
