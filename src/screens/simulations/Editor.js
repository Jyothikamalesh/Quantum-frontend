import React, { useState, useEffect } from "react";

import MonacoEditor from "react-monaco-editor";
import Logo from "../../assets/images/college_logo.png";
import { WithAppHeader } from "../../hoc";

function ScriptPage() {
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [buttonMessage, setButtonMessage] = useState("");
    const [drawing, setDrawing] = useState(null);
  const [inputValue, setInputValue] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the input value and generate drawing data
    const drawingData = generateDrawing(inputValue);
    // Set the drawing data to state
    setDrawing(drawingData);
  };

  // Function to generate drawing data based on input value
  const generateDrawing = (input) => {
    // Your logic to generate drawing data based on input value
    // This could involve drawing shapes, lines, or images on the canvas
    // For example, you can use the Canvas API to draw shapes and images
    // This function should return the drawing data
    return input.toUpperCase(); // For demonstration, simply converting input to uppercase
  };

    useEffect(() => {
        // Initialize buttonMessage to an empty string when the component mounts
        setButtonMessage("");
    }, []);

    const onChange = (newValue) => {
        setCode(newValue);
    };

    const executeCode = async (button) => {
        try {
            // Add logic to execute Python code based on the button clicked
            if (button === 0) {
                // Execute Python code here and set the output accordingly
                const response = await fetch(
                    "http://localhost:5000/api/execute-python",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ code }),
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to execute Python code");
                }

                const data = await response.json();
                setOutput(data.output);
                setError("");
            } else {
                // For buttons other than "Run", set the button message
                let message = "";
                if (button === 1) {
                    message = "Displaying Circuit Image";
                    // Fetch the circuit image from the backend and set it as output
                    const response = await fetch("http://localhost:5000/api/circuit");
                    if (response.ok) {
                        const imageData = await response.blob();
                        setOutput(URL.createObjectURL(imageData));
                    }
                } else if (button === 2) {
                    message = "Displaying Histogram Image";
                    // Fetch the histogram image from the backend and set it as output
                    const response = await fetch("http://localhost:5000/api/histogram");
                    if (response.ok) {
                        const imageData = await response.blob();
                        setOutput(URL.createObjectURL(imageData));
                    }
                }
                setButtonMessage(message);
            }
        } catch (error) {
            setError(error.message);
            setOutput("");
        }
    };

    return (
        <div>
            <div>
                <div className="flex justify-center items-center p-7">
                    <img src={Logo} alt="Logo" />
                </div>
            </div>

            <div className="flex pl-12">
                <div className=" bg-slate-200 h-[600px] w-[65%]">
                    <div>
                        <div className="bg-[#444444] flex justify-between ">
                            <div>
                                <p className="text-white ml-5 font-bold text-sm mt-2 mr-4">
                                    This is a Python code editor
                                </p>
                            </div>
                            <div>
                                <button
                                    className="bg-blue-500 text-white hover:bg-blue-800 text-base px-2 py-1 my-1 font-bold mr-4 rounded-sm"
                                    onClick={() => executeCode(0)}
                                >
                                    Run
                                </button>
                            </div>
                        </div>
                        <div className="h-[400px]">
                            <MonacoEditor
                                language="python"
                                theme="vs-dark"
                                value={code}
                                options={{
                                    selectOnLineNumbers: true,
                                    automaticLayout: true,
                                }}
                                onChange={onChange}
                            />
                            <div className="bg-[#444444] text-white px-4 py-2 h-[162px] ">
                                <h2 className="font-bold text-sm mb-2">Output Console :</h2>
                                {output && typeof output === "string" ? (
                                    <img src={output} alt="Output" />
                                ) : (
                                    <div>{output}</div>
                                )}
                                {error && <div>Error: {error}</div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#444444] ml-10 h-[600px] w-[30%]">
                    <div className=" h-full">
                        <div className="flex flex-col justify-start">
                            <div className="flex flex-row  justify-evenly mt-2">
                                <div className="flex items-center">
                                    <button
                                        className="text-white hover:bg-blue-500 font-bold px-4 py-2 rounded-md mb-4 mr-2"
                                        onClick={() => executeCode(1)}
                                    >
                                        <div className="flex items-center">
                                            {buttonMessage === "Displaying Circuit Image" && (
                                                <img src={output} alt="Circuit" className="mr-2" />
                                            )}
                                            Circuit
                                        </div>
                                    </button>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        className="text-white hover:bg-blue-500 font-bold px-4 py-2 rounded-md mb-4 mr-2"
                                        onClick={() => executeCode(2)}
                                    >
                                        <div className="flex items-center">
                                            {buttonMessage === "Displaying Histogram Image" && (
                                                <img src={output} alt="Histogram" className="mr-2" />
                                            )}
                                            Histogram
                                        </div>
                                    </button>
                                </div>
                            </div>
                            {buttonMessage && (
                                <div className="text-white flex justify-center items-center h-[530px] mt-2">
                                    {buttonMessage}
                                </div>
                            )}

                            <div className="flex flex-col justify-end items-center mt-auto">
                                <form onSubmit={handleSubmit} className="mb-0 flex items-center">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="border-2 border-gray-400 px-4 py-2 rounded-md mb-4 mr-2 focus:outline-none focus:border-blue-500"
                                        placeholder="Enter text for drawing"
                                    />
                                    <button
                                        type="submit"
                                        className="text-white hover:bg-blue-500 font-bold px-4 py-2 rounded-md mb-4 mr-2 bg-blue-500"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScriptPage;
