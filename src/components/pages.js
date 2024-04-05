import React, { useEffect, useState } from 'react'
import "../styles/pages.css";
import frame0 from "../media/frame0.gif";
import frame_movie from "../media/frame-movie.png";
import frame_erin from "../media/e-frame.png";
import frame_skyfall from "../media/frame-skyfall.gif";
import frame_taxcat from "../media/frame-tax-cat.png";
import frame_drive from "../media/frame-drive.gif";
import frame_food from "../media/frame-food.gif";
import frame_last from "../media/frame_last.gif";
import sentences from "../media/sentenceData";


export default function Pages({currentIndex}) {
    const [frame, setFrame] = useState(null);
    const [opacity, setOpacity] = useState(0);


    useEffect(()=>{
        setOpacity(1);
        if (currentIndex >= sentences.length - 2){
            setFrame(frame_last);
        }
        else if (currentIndex >= 1 && currentIndex < 8){
            setFrame(frame_movie);
        }
        else if (currentIndex >= 8 && currentIndex < 15){
            setFrame(frame_erin);
        }
        else if (currentIndex === 15) {
            setFrame(frame_skyfall);
        }
        else if (currentIndex >= 16 && currentIndex < 21) {
            setFrame(frame_food);
        }
        else if (currentIndex >= 21 && currentIndex < 23) {
            setFrame(frame_taxcat);
        }
        else if (currentIndex >= 23 && currentIndex < 26) {
            setFrame(frame_drive);
        }
        else {
            setFrame(frame0);
        }
    }, [currentIndex]);


  return (
    <div className='dialogue box'>
      <img src={frame} style={{ opacity: opacity, transition: 'opacity 5s ease-in-out' }}/>
    </div>
  )
}
