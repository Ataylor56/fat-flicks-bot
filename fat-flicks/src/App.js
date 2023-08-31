import React, { useState } from 'react';
// import { IMaskInput } from 'react-imask';
import { Container, FormGroup, FormControl, TextField, Box, Input, InputLabel, Button, InputAdornment } from '@mui/material';
import { Search, WidthNormal, Height } from '@mui/icons-material';
import './App.css';

const base_url = 'https://secure-images.nike.com/is/image/DotCom/FD2631_600_A_PREM?wid=1920&hei=1920';


function BuildUrl({sku, width, height}) {
  //const angle = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'K', 'P']
  const angle = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  const urls = [];
  //const xhr = new XMLHttpRequest();
  debugger;
  angle.forEach((angle) => {
    const url = `https://secure-images.nike.com/is/image/DotCom/${sku}_${angle}_PREM?wid=${width}&hei=${height}`;
    //xhr.open('GET', url, false);
    //const response = xhr.send();

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
    const regex = '/^[A-Za-z0-9]{6}-[A-Za-z0-9]{3}$/';
    const urls = BuildUrl({sku: searchInput, width: imageWidth, height: imageHeight});
    setImages(urls);
  };
  return (
    <Container maxWidth="xl" sx={{display: 'flex', marginTop: '50px', justifyContent: 'center', flexDirection: 'column'}}>
      <FormGroup sx={{alignItems: 'center', justifyContent: 'center'}}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '10px', justifyContent: 'center'}}>
          <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField type="text" label="Sku" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} sx={{width: '405px'}} />
          <Button variant='contained' sx={{marginLeft: 1}} onClick={() => {setSearchInput(''); setImages([])}}>Clear</Button>
        </Box>

        <Container sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>

          <Box sx={{ display: 'flex', alignItems: 'flex-end', marginY: '10px', marginX: '15px' }}>
            <Height sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField type="number" label="Height" variant='standard' value={imageHeight} onChange={(e) => setImageHeight(e.target.value)} inputProps={
              {
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              }
            } />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-end', marginY: '10px', marginX: '15px'}}>
            <WidthNormal sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField type="number" label="Width" variant="standard" value={imageWidth} onChange={(e) => setImageWidth(e.target.value)} />
          </Box>

        </Container>
        
      <Button variant='contained' sx={{width: '425px', marginLeft: 1}} onClick={handleSearch}>Search</Button>
      </FormGroup>
      <Container maxWidth='xl' style={{alignItems: 'center'}} sx={{display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
        {images.map((image, index) => {
            return <img key={index} src={image.url} alt="title" width={image.width/2}/>
          })}
      </Container>
    </Container>
  );
}

export default App;
