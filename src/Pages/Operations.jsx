import { Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Operations() {
  const [type, setType] = useState("audio");
  const [audioTranscript, setAudioTranscript] = useState("");
  const [query, setQuery] = useState("");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setAudioTranscript(transcript);
    }
  }, [transcript]);

  return (
    <div className="mt-10 max-w-lg mx-auto">
      <div className="text-center">
        <Radio.Group
          size="large"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="font-semibold"
        >
          <Radio value={"text"} className="text-lg !font-secondary">
            Use Text
          </Radio>
          <Radio value={"audio"} className="text-lg !font-secondary">
            Use Audio
          </Radio>
        </Radio.Group>
      </div>
      {type === "audio" && (
        <div className="mt-4">
          <div className="flex items-center gap-4 font-secondary justify-center">
            <h1>Click the button to record audio: </h1>
            <div>
              {listening ? (
                <button
                  className="bg-orange-400 text-white p-3 rounded-full shadow-lg"
                  onClick={SpeechRecognition.stopListening}
                >
                  <FaStop size={20} />
                </button>
              ) : (
                <button
                  className="bg-orange-400 text-white p-3 rounded-full shadow-lg"
                  onClick={() => {
                    resetTranscript();
                    SpeechRecognition.startListening();
                  }}
                >
                  <FaMicrophone size={20} />
                </button>
              )}
            </div>
          </div>
          <div className="mt-6 text-right">
            <TextArea
              value={audioTranscript}
              onChange={(e) => setAudioTranscript(e.target.value)}
              rows={5}
              className="font-secondary text-gray-800"
            />
            <button className="mt-4 bg-blue-500 rounded text-white p-2 px-4 font-secondary font-semibold">
              Convert To SQL
            </button>
          </div>
        </div>
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
