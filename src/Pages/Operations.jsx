import { Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiText } from "react-icons/bi";
import { FaRegFileAudio } from "react-icons/fa6";
import AgGridTable from "../Components/AgGridTable";
import AudioInput from "../Components/AudioInput";

/*
CREATE ESTIMATOR salaryPredictor TYPE LR FORMULA $salary~years$;
CREATE TRAINING PROFILE oneshotSalary WITH [SELECT * FROM salary];
USE 'data/salarydb.db';
TRAIN salaryPredictor WITH TRAINING PROFILE oneshotSalary;
PREDICT WITH TRAINING PROFILE oneshotSalary BY ESTIMATOR salaryPredictor;
*/

function Operations() {
  const [type, setType] = useState("text");
  const [audioTranscript, setAudioTranscript] = useState("");
  const [query, setQuery] = useState("");
  const [rowData, setRowData] = useState();

  const handleExecute = async () => {
    setRowData();
    if (!query) {
      toast.error("Query can't be empty");
      return;
    }
    if (query[query.length - 1] !== ";") {
      toast.error("Invalid Query.");
      return;
    }
    let inputs = query.split(";");
    inputs = inputs.slice(0, inputs.length - 1);
    inputs = inputs.map((val) => val.trim() + ";");
    for (let input of inputs) {
      if (!input) {
        toast.error("Invalid Query.");
        return;
      }
    }
    try {
      console.log(inputs);
      const res = await fetch("http://localhost:8000/test_url/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: inputs }),
      });
      const data = await res.json();
      console.log(data);
      setRowData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10 max-w-lg mx-auto">
      <Toaster />
      <div className="text-center">
        <Radio.Group
          size="large"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="font-semibold"
          buttonStyle="solid"
        >
          <Radio.Button value={"text"} className=" !font-secondary">
            <div className="flex items-center gap-2">
              <span className="">Use Text</span>{" "}
              <span>
                <BiText size={22} />
              </span>
            </div>
          </Radio.Button>
          <Radio.Button value={"audio"} className=" !font-secondary">
            <div className="flex items-center gap-2">
              <span>Use Audio</span>{" "}
              <span>
                <FaRegFileAudio size={22} />
              </span>
            </div>
          </Radio.Button>
        </Radio.Group>
      </div>
      {type === "audio" && (
        <AudioInput
          audioTranscript={audioTranscript}
          setAudioTranscript={setAudioTranscript}
        />
      )}
      <div className="mt-6 text-right">
        <h1 className="text-left font-secondary text-lg font-semibold mb-2">
          Enter your query:
        </h1>
        <TextArea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={5}
          placeholder="Enter your SQL query"
          className="font-secondary text-gray-800"
        />
        <button
          className="mt-4 bg-blue-500 rounded text-white p-2 px-4 font-secondary font-semibold"
          onClick={handleExecute}
        >
          Execute
        </button>
      </div>
      {rowData && (
        <div className="mt-8  mx-auto">
          <AgGridTable rowData={rowData} />
        </div>
      )}
    </div>
  );
}

export default Operations;

/*

*/
