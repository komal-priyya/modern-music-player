import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import ArtistPage from '../pages/ArtistPage';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>

        <Route path = "/" element={<Home/>}/>
                <Route path="/artist/:name" element={<ArtistPage />} />

      </Routes>
      
      
      
      </BrowserRouter>
    </div>
  );
}

export default App