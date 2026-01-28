import React, { useState } from "react";
import style from "./textToSign.module.css";
import { FaPlay } from "react-icons/fa";
// تأكد من صحة مسار الصورة في مشروعك
import avatarPlaceholder from "../../assets/avatarintexttosign.png";

const TextToSign = () => {
  const [inputText, setInputText] = useState("");

  const handleConvert = () => {
    console.log("Converting text:", inputText);
    // هنا سيتم الربط مع الباك-إند لاحقاً
  };

  return (
    <div className={style.pageContainer}>
      {/* رأس الصفحة */}
      <div className={style.headerSection}>
        <h1 className={style.mainTitle}>Convert Text to Sign Language</h1>
        <p className={style.description}>
          Enter text to see the magic of sign language
        </p>
      </div>

      {/* الحاوية الرئيسية (الإطار الأزرق) */}
      <div className={style.mainLayout}>
        <div className={style.contentRow}>
          
          {/* الجانب الأيسر: إدخال النص والزر */}
          <div className={style.inputColumn}>
            <div className={style.textInputWrapper}>
              <textarea
                className={style.textArea}
                placeholder="Enter text ........."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
            <button className={style.convertBtn} onClick={handleConvert}>
              Convert
            </button>
          </div>

          {/* الجانب الأيمن: عرض الأفاتار (بدون حواف سوداء) */}
          <div className={style.displayColumn}>
            <div className={style.videoWrapper}>
              <img
                src={avatarPlaceholder}
                alt="Sign Language Avatar"
                className={style.avatarImage}
              />
              {/* طبقة زر التشغيل فوق الصورة */}
              <div className={style.playOverlay}>
                <FaPlay className={style.playIcon} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TextToSign;