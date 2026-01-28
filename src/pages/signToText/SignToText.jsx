import React from "react";
import { FaStopCircle, FaPlay } from "react-icons/fa";
import { LuScanLine } from "react-icons/lu";
import style from "./signToText.module.css";

const SignToText = () => {
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
              <div className={style.liveIndicator}>LIVE</div>

              <LuScanLine className={style.scanIcon} />

              {/* add camera feed here */}
            </div>
          </div>

          <div className={style.textColumn}>
            <h3 className={style.convertedHeading}>Converted Text</h3>
            <div className={style.resultBox}>
              <p className={style.resultText}>
                Converted text will appear here...
              </p>
            </div>
          </div>
        </div>

        <div className={style.buttonGroup}>
          <button className={style.btnStart}>
            <FaPlay fontSize="14px" /> Start
          </button>
          <button className={style.btnStop}>
            <FaStopCircle /> Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignToText;
