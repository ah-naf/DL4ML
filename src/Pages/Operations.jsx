import { Radio } from "antd";
import React, { useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

function Operations() {
  const [type, setType] = useState("audio");
  const [audioUrl, setAudioUrl] = useState();
  const recordingController = useAudioRecorder();

  const recordingComplete = (blob) => {
    setAudioUrl(null);
    const url = URL.createObjectURL(blob);

    setAudioUrl(url);
  };
  return (
    <div className="mt-10">
      <div>
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
          <div className="flex items-center gap-4 font-secondary">
            <h1>Click the button to record audio: </h1>
            <AudioRecorder
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
              }}
              onNotAllowedOrFound={(e) => console.log(e)}
              mediaRecorderOptions={{
                audioBitsPerSecond: 128000,
              }}
              onRecordingComplete={recordingComplete}
              showVisualizer={true}
              recorderControls={{
                ...recordingController,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Operations;
