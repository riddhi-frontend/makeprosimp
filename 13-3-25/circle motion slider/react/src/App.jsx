
import React from "react";
import EasySlides from "./EasySlides"; // Import the EasySlides component
import "./css/EasySlider.css"; // Ensure this file contains the provided CSS

const slides = [
  "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
  "https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg",
  "https://via.placeholder.com/400x300/3357FF",
  "https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg",
  "https://via.placeholder.com/400x300/A833FF",
  "https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg",
  "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
  "https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg",
  "https://via.placeholder.com/400x300/3357FF",
  "https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg",
  "https://via.placeholder.com/400x300/A833FF",
  "https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg",
  
];

const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Circular Image Slider</h1>
      <EasySlides 
        slides={slides} 
        autoplay={true} 
        timeout={3000} 
        loop={true} 
        startslide={0} 
        show={5}
      />
    </div>
  );
};

export default App;
