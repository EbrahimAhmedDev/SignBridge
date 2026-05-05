import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaStopCircle, FaPlay } from "react-icons/fa";
import { LuScanLine } from "react-icons/lu";
import { predictSignFrames } from "../../api/aiService";
import style from "./signToText.module.css";

const TARGET_CAPTURE_FPS = 30;
const CAPTURE_INTERVAL_MS = Math.floor(1000 / TARGET_CAPTURE_FPS);
const MIN_PROCESS_FRAMES = 5;

const SignToText = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const captureIntervalRef = useRef(null);
  const framesRef = useRef([]);

  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [convertedText, setConvertedText] = useState(
    "Converted text will appear here..."
  );
  const [topPredictions, setTopPredictions] = useState([]);

  const clearCaptureLoop = useCallback(() => {
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
      captureIntervalRef.current = null;
    }
  }, []);

  const stopCamera = useCallback(() => {
    clearCaptureLoop();

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [clearCaptureLoop]);

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || video.readyState < 2) {
      return;
    }

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    framesRef.current.push(canvas.toDataURL("image/jpeg", 0.7));
  };

  const handleStart = async () => {
    if (isRecording || isLoading) {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          frameRate: {
            min: TARGET_CAPTURE_FPS,
            ideal: TARGET_CAPTURE_FPS,
            max: TARGET_CAPTURE_FPS,
          },
        },
        audio: false,
      });

      streamRef.current = stream;
      framesRef.current = [];
      setConvertedText("Capturing signs...");
      setTopPredictions([]);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      captureIntervalRef.current = window.setInterval(
        captureFrame,
        CAPTURE_INTERVAL_MS
      );
      setIsRecording(true);
    } catch {
      setConvertedText("Unable to start camera.");
    }
  };

  const handleStop = async () => {
    if (!isRecording) {
      return;
    }

    const capturedFrames = [...framesRef.current];
    stopCamera();
    setIsRecording(false);

    if (capturedFrames.length < MIN_PROCESS_FRAMES) {
      setConvertedText(
        "Not enough frames captured. Keep signing a bit longer and try again."
      );
      setTopPredictions([]);
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await predictSignFrames(capturedFrames);
      setConvertedText(data.best_label || "No label returned.");
      setTopPredictions(data.top_predictions || []);
    } catch {
      setConvertedText("Could not convert sign to text.");
      setTopPredictions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className={style.pageContainer}>
      <div className={style.headerSection}>
        <h1 className={style.mainTitle}>Sign Language to Text</h1>
        <p className={style.description}>
          Convert sign language from your camera into written text instantly
        </p>
      </div>

      <div className={style.mainLayout}>
        <div className={style.topFlexRow}>
          <div className={style.cameraColumn}>
            <div className={style.videoWrapper}>
              {isRecording && <div className={style.liveIndicator}>LIVE</div>}

              {!isRecording && <LuScanLine className={style.scanIcon} />}

              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transform: "scaleX(1)",
                }}
              />
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
          </div>

          <div className={style.textColumn}>
            <h3 className={style.convertedHeading}>Converted Text</h3>
            <div className={style.resultBox}>
              <p className={style.resultText}>{convertedText}</p>
              {topPredictions.length > 0 && (
                <>
                  <p className={style.resultText}>Predictions:</p>
                  {topPredictions.map((prediction) => (
                    <p
                      key={`${prediction.rank}-${prediction.label}`}
                      className={style.predictionText}
                    >
                      <span className={style.predictionLabel}>
                        {prediction.label}
                      </span>
                      <span className={style.predictionValue}>
                        {prediction.confidence}%
                      </span>
                    </p>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        <div className={style.buttonGroup}>
          <button
            className={style.btnStart}
            onClick={handleStart}
            disabled={isRecording || isLoading}
          >
            <FaPlay fontSize="14px" /> Start
          </button>
          <button
            className={style.btnStop}
            onClick={handleStop}
            disabled={!isRecording}
          >
            <FaStopCircle /> Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignToText;
