import React, { useEffect, useState, useRef } from "react";
import "../styles/dialogueBox.css";
import sentences from "../media/sentenceData";
import Pages from "./pages.js";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function DialogueBox() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);
  const [startPressed, setStartPressed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const revealSpeed = 85; // Adjust the speed here
  const hidden_str = "|";
  const audioRef = useRef(null);
  const lilySong = require("../media/lily-sunshine-audio_edited.mp3");

  useEffect(() => {
    if (startPressed === true) {
      revealText();
    }
  }, [startPressed, currentIndex]);

  const handleStart = () => {
    setStartPressed(true);
    audioRef.current.play();
  };

  const revealText = () => {
    setIsPrinting(true);
    setDisplayText("");
    if (currentIndex < sentences.length) {
      printSentence(sentences[currentIndex]);
    } else {
      printSentence("Happy Birthday");
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };

  const handleRestart = () => {
    setStartPressed(false);
    setCurrentIndex(0);
    // stop the song
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const printSentence = (sentence) => {
    let index = -1;
    const timer = setInterval(() => {
      if (index < sentence.length - 1) {
        setDisplayText((prevText) => prevText + sentence[index]);
        index++;
      } else {
        clearInterval(timer);
        setIsPrinting(false);
      }
    }, revealSpeed);
  };

  return (
    <div>
      <div className="center">
        {startPressed ? (
          <>
            {isMuted ? (
              <FaVolumeMute className="volume-btn" onClick={handleMute} />
            ) : (
              <FaVolumeUp className="volume-btn" onClick={handleMute} />
            )}
            <Pages currentIndex={currentIndex} />
            <div
              className={`dialogue txt-box ${displayText ? "" : "txt-black"}`}
            >
              {displayText ? displayText : hidden_str}
            </div>
          </>
        ) : (
          <div className="dialogue np-btn start-btn" onClick={handleStart}>
            Start
          </div>
        )}
      </div>
      {startPressed && !isPrinting && (
        <div className={`page-turn ${currentIndex === 0 ? "right-align" : ""}`}>
          {currentIndex !== 0 && (
            <div className="dialogue np-btn" onClick={handlePrev}>
              Prev
            </div>
          )}
          {currentIndex !== sentences.length && (
            <div className="dialogue np-btn" onClick={handleNext}>
              Next
            </div>
          )}
          {currentIndex === sentences.length && (
            <div className="dialogue np-btn" onClick={handleRestart}>
              Back to Start
            </div>
          )}
        </div>
      )}
      <audio ref={audioRef} src={lilySong} loop muted={isMuted} />
    </div>
  );
}
