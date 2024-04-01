import React, { useEffect, useState } from 'react'
import "../styles/pages.css";
import frame0 from "../media/frame0.gif";
import frame_movie from "../media/frame-movie.png";
import frame_erin from "../media/e-frame.png";
import frame_food from "../media/frame-food.gif";
import frame_last from "../media/frame_last.gif";
import sentences from "../media/sentenceData";


export default function Pages({currentIndex}) {
    const [frame, setFrame] = useState(null);

    useEffect(()=>{
        if (currentIndex >= sentences.length - 2){
            setFrame(frame_last);
        }
        else if (currentIndex >= 8 && currentIndex < 16){
            setFrame(frame_erin);
        }
        else if (currentIndex >= 16 && currentIndex < 21) {
            setFrame(frame_food);
        }
        else if (currentIndex >= 1 && currentIndex < 8){
            setFrame(frame_movie);
        }
        else {
            setFrame(frame0);
        }
    }, [currentIndex]);


  return (
    <div className='dialogue box'>
      <img src={frame}/>
    </div>
  )
}
