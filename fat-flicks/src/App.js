import React, { useState } from 'react';

const base_url = 'https://secure-images.nike.com/is/image/DotCom/FD2631_600_A_PREM?wid=1920&hei=1920';


function BuildUrl({sku, width=1500, height=1500}) {
  const angle = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'K', 'P']
  const urls = [];
  angle.forEach((angle) => {
    const url = `https://secure-images.nike.com/is/image/DotCom/${sku}_${angle}_PREM?wid=${width}&hei=${height}`;
    urls.push({url, width})
  })
  return urls;
}

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [images, setImages] = useState([]);
  const [imageWidth, setImageWidth] = useState(1500);
  const [imageHeight, setImageHeight] = useState(1500);

  const handleSearch = async () => {
    const urls = BuildUrl({sku: searchInput, width: imageWidth, height: imageHeight});
    setImages(urls);
  };
  return (
    <div>
      <div>
        <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        <input type="text" value={imageWidth} onChange={(e) => setImageWidth(e.target.value)} />
        <input type="text" value={imageHeight} onChange={(e) => setImageHeight(e.target.value)} />
      </div>
      
      <button onClick={handleSearch}>Search</button>
        {images.map((image, index) => {
          return <img key={index} src={image.url} alt="title" width={image.width/2}/>
        })}
    </div>
  );
}

export default App;
