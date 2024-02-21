import { Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { BiText } from "react-icons/bi";
import { FaRegFileAudio } from "react-icons/fa6";
import AudioInput from "../Components/AudioInput";

function Operations() {
  const [type, setType] = useState("audio");
  const [audioTranscript, setAudioTranscript] = useState("");
  const [query, setQuery] = useState("");

  return (
    <div className="mt-10 max-w-lg mx-auto">
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
        <button className="mt-4 bg-blue-500 rounded text-white p-2 px-4 font-secondary font-semibold">
          Execute
        </button>
      </div>
    </div>
  );
}

export default Operations;
