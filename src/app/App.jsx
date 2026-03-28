import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { PlayerProvider } from "../context/PlayerContext";
import ArtistPage from "../pages/ArtistPage";
import Assistant from "../pages/Assistant";
import Home from "../pages/Home";
import Library from "../pages/Library";
import PlaylistDetail from "../pages/PlaylistDetail";
import Search from "../pages/Search";

function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/artist/:name" element={<ArtistPage />} />
            <Route path="/playlist/:id" element={<PlaylistDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  );
}

export default App;
