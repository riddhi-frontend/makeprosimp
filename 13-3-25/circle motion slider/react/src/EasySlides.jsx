import React, { useState, useEffect, useRef } from "react";

const EasySlides = ({
  slides = [],
  autoplay = false,
  timeout = 3000,
  show = 5,
  loop = true,
  startslide = 0,
  delayaftershow = 300,
  touchevents = true,
  distancetochange = 10,
  beforeshow = () => {},
  aftershow = () => {},
  onclick = () => {},
  disabledefaultclick = false,
}) => {
  const [curSlide, setCurSlide] = useState(startslide);
  const [canChange, setCanChange] = useState(true);
  const slidesRef = useRef(null);
  const autoplayTimer = useRef(null);
  const touchStart = useRef(null);
  let targetSlide = 0;
  const totalSlides = slides.length;

  // Function to change slides
  const changeSlide = (nextSlide) => {
    if (!canChange) return;
    setCanChange(false);
    setTimeout(() => setCanChange(true), delayaftershow);

    clearTimeout(autoplayTimer.current);
    beforeshow();

    let newSlide = nextSlide;
    if (loop) {
      newSlide = (newSlide + totalSlides) % totalSlides;
    } else {
      newSlide = Math.max(0, Math.min(newSlide, totalSlides - 1));
    }

    setCurSlide(newSlide);
    aftershow();

    if (autoplay) {
      autoplayTimer.current = setTimeout(() => changeSlide(curSlide + 1), timeout);
    }
  };

  // Handle clicking a slide
  const handleClick = (index) => {
    onclick(index);
    if (disabledefaultclick) return;

    targetSlide = index;
    changeSlide(targetSlide);
  };

  // Autoplay effect
  useEffect(() => {
    if (autoplay) {
      autoplayTimer.current = setTimeout(() => changeSlide(curSlide + 1), timeout);
    }
    return () => clearTimeout(autoplayTimer.current);
  }, [curSlide, autoplay, timeout]);

  // Touch event handlers
  const handleTouchStart = (e) => {
    if (!touchevents) return;
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchevents) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchEnd - touchStart.current;

    if (Math.abs(distance) > distancetochange) {
      changeSlide(curSlide + (distance > 0 ? -1 : 1));
    }
  };

  return (
    <div
      className="slider_circle_10"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      ref={slidesRef}
    >
      <button className="prev_button" onClick={() => changeSlide(curSlide - 1)}></button>

      {slides.map((slide, index) => {
        let className = "hidden";
        let offset = (index - curSlide + totalSlides) % totalSlides;

        if (offset === 0) className = "active";
        else if (offset === 1) className = "next1";
        else if (offset === 2) className = "next2";
        else if (offset === 3) className = "next3";
        else if (offset === 4) className = "next4";
        else if (offset === 5) className = "next5";
        else if (offset === totalSlides - 1) className = "prev1";
        else if (offset === totalSlides - 2) className = "prev2";
        else if (offset === totalSlides - 3) className = "prev3";
        else if (offset === totalSlides - 4) className = "prev4";
        else if (offset === totalSlides - 5) className = "prev5";

        return (
          <div key={index} className={`slider_circle_10 ${className}`} onClick={() => handleClick(index)}>
            <img src={slide} alt={`Slide ${index}`} />
          </div>
        );
      })}

      <button className="next_button" onClick={() => changeSlide(curSlide + 1)}></button>

      <div className="nav_indicators">
        <ul>
          {slides.map((_, index) => (
            <li
              key={index}
              className={index === curSlide ? "active" : ""}
              onClick={() => handleClick(index)}
            ></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EasySlides;
