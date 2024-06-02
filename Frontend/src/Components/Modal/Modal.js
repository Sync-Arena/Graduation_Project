import React from "react";
import "./Modal.css";
import { NavLink } from "react-router-dom";
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Modal({ setOpenModal, data }) {
    console.log(data)
    let stdinout = []
    for (let i = 0; i < data.stdin.length; ++i) {
        stdinout.push({ input: data.stdin[i], output: data.stdout[i], answer: data.answers[i] })
    }
    console.log(stdinout)
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(prv => {
                                let arr = [];
                                for (let i = 0; i < prv.length; ++i) arr.push(false)
                                return arr
                            });

                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <div className="title">
                    <p>
                        By {data.user.userName},
                        contest: <NavLink to={`../../contests/${data.contest}`}>{data.contest}</NavLink>,
                        problem: {data.problemName}, {data.wholeStatus}
                    </p>
                </div>
                <div className="body-parent">
                    <div className="body">
                        <pre><code>
                            {data.sourceCode}
                        </code></pre>
                    </div>
                </div>
                <div className="footer">
                    <p className="text-xl mb-3">Judgement Protocol</p>
                    <div>
                        {
                            stdinout.map(inout => 
                                <div>
                                    <div>
                                        <p>Input</p>
                                        <pre><code className="text-sm">{inout.input}</code></pre>
                                    </div>
                                    <div>
                                        <p>Output</p>
                                        <pre><code className="text-sm">{inout.output}</code></pre>
                                    </div>
                                    <div>
                                        <p>Answer</p>
                                        <pre><code className="text-sm">{inout.answer}</code></pre>
                                    </div>
                                </div>

                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;