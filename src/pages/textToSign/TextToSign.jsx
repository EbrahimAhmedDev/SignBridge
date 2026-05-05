import { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./TextToSign.module.css";
import { getAllSigns } from "../../api/signsService";

const defaultVideo = {
  title: "Welcome to SignBridge Text to Sign",
  videoUrl: "https://www.youtube.com/embed/umlJJFVgYVI",
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const getSignId = (sign) => sign?._id || sign?.id;

const TextToSign = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [signsData, setSignsData] = useState([]);
  const [selectedSign, setSelectedSign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSigns = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const { data } = await getAllSigns();
        setSignsData(Array.isArray(data) ? data : []);
      } catch (error) {
        setErrorMessage(
          error?.response?.data?.message || "Failed to load signs data.",
        );
        setSignsData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSigns();
  }, []);

  useEffect(() => {
    if (!selectedSign) return;

    const stillExists = signsData.some(
      (sign) => getSignId(sign) === getSignId(selectedSign),
    );
    if (!stillExists) {
      setSelectedSign(null);
    }
  }, [signsData, selectedSign]);

  const filteredSigns = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    if (!normalizedTerm) return signsData;
    return signsData.filter((sign) =>
      sign.label.toLowerCase().includes(normalizedTerm),
    );
  }, [searchTerm, signsData]);

  const activeVideo = selectedSign || defaultVideo;

  const getHighlightedLabel = (label) => {
    const normalizedTerm = searchTerm.trim();
    if (!normalizedTerm) {
      return label;
    }

    const regex = new RegExp(`(${escapeRegExp(normalizedTerm)})`, "ig");
    const parts = label.split(regex);

    const target = normalizedTerm.toLowerCase();
    return parts.map((part, index) =>
      part.toLowerCase() === target ? (
        <mark key={`${label}-${index}`} className={styles.matchText}>
          {part}
        </mark>
      ) : (
        <span key={`${label}-${index}`}>{part}</span>
      ),
    );
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerSection}>
        <h1 className={styles.mainTitle}>Text to Sign Video Search</h1>
        <p className={styles.description}>
          Find signs instantly and watch the matching video.
        </p>
      </div>

      <div className={styles.layoutCard}>
        <div className={styles.searchColumn}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} aria-hidden="true" />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search for a word or phrase..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className={styles.resultsList}>
            {isLoading ? (
              <p className={styles.emptyState}>Loading signs...</p>
            ) : errorMessage ? (
              <p className={styles.errorState}>{errorMessage}</p>
            ) : filteredSigns.length > 0 ? (
              filteredSigns.map((sign) => (
                <button
                  key={getSignId(sign)}
                  type="button"
                  className={`${styles.resultItem} ${
                    getSignId(selectedSign) === getSignId(sign)
                      ? styles.selectedItem
                      : ""
                  }`}
                  onClick={() => setSelectedSign(sign)}
                >
                  {getHighlightedLabel(sign.label)}
                </button>
              ))
            ) : (
              <p className={styles.emptyState}>No matching signs found.</p>
            )}
          </div>
        </div>

        <div className={styles.videoColumn}>
          <h2 className={styles.videoTitle}>
            {selectedSign?.label || activeVideo.title}
          </h2>
          <div className={styles.videoContainer}>
            <iframe
              title={selectedSign?.label || "Welcome to SignBridge"}
              src={activeVideo.videoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToSign;
