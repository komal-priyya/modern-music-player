import { useEffect, useState } from "react";
import ArtistCardPreview from "./ArtistCardPreview";
import { getFeaturedArtists } from "../../services/musicApi";

function TopArtists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadArtists() {
      const nextArtists = await getFeaturedArtists();
      if (active) {
        setArtists(nextArtists);
      }
    }

    loadArtists().catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="glass-panel p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="pill">Artist radar</p>
          <h2 className="section-title mt-3">Fast jump into top artists</h2>
        </div>
        <p className="section-copy max-w-2xl">
          Hover a card for a quick preview, open the artist page for deeper info, or launch their
          tracks straight into the player.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {artists.map((artist) => (
          <ArtistCardPreview key={artist.id} artist={artist} />
        ))}
      </div>
    </section>
  );
}

export default TopArtists;
