import React,{useRef, useState} from 'react'
import './ImageGenerator.css'
import default_image from '../assets/preview.webp'
import jsonData from '../assets/data.json';

export const ImageGenerator = () => {
  const inputRef = useRef(null);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const generateImages = () => {
    const userInput = inputRef.current.value.toLowerCase().trim();

    // Filter images based on user input
    const filtered = jsonData.filter(image => image.description.toLowerCase().includes(userInput));

    // Update state with filtered images
    setFilteredImages(filtered);

    // Reset selected image when generating new results
    setSelectedImage(null);
  };

  const handleImageSelect = (imageUrl) => {
    // Set the selected image when a user clicks on a dropdown item
    setSelectedImage(imageUrl);
  };

  return (
    <div className='ai-image-generator'>
      <div className="header">AI Image <span>Generator</span></div>
      <div className="img-loading">
        <div className="image">
          <img src={selectedImage || default_image} alt="" />
        </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className='search-input' placeholder='Describe What You Want To See' />
        <div className="generate-btn" onClick={generateImages}>Generate</div>
      </div>
      {filteredImages.length > 0 && (
        <div className="image-dropdown">
          <p>Choose an image:</p>
          <ul>
            {filteredImages.map((image, index) => (
              <li key={index} onClick={() => handleImageSelect(image.url)}>
                <img src={image.url} alt={image.description} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};