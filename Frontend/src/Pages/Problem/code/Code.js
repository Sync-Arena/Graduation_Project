import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight, solarizedDarkAtom} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FaCheck } from "react-icons/fa6";

import 'bootstrap-icons/font/bootstrap-icons.css';
import { FiCopy } from "react-icons/fi";

import '../style/Code.css';

const Code = ({known, children, lang, isDark}) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsCopied(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [isCopied]);

  return (
    <div className='code'  style={{ direction: 'ltr' }}>
      <CopyToClipboard text={children} onCopy={() => setIsCopied(true)}>
        <button className='icon'>
          {isCopied ? <FaCheck /> :  < FiCopy />}
        </button>
      </CopyToClipboard>
      {known === 1 
        ? 
        <SyntaxHighlighter
          children={String(children).replace(/\n$/, '')}
          language={lang}
          style={isDark ? solarizedDarkAtom : solarizedlight}
        />
        : 
        <pre>
          <code>
            {children}
          </code>
        </pre>
      }
    </div>
  );
};

export default Code;