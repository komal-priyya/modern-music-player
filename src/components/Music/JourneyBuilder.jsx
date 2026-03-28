import { useState } from "react";
import { ArrowRightLeft, Save } from "lucide-react";
import toast from "react-hot-toast";
import { usePlayer } from "../../hooks/usePlayer";
import { buildBlendJourney } from "../../services/musicApi";
import TrackCard from "./TrackCard";

const moods = ["Night drive", "Soft romantic", "Festival energy", "Lo-fi focus", "Retro disco"];

function JourneyBuilder() {
  const [fromArtist, setFromArtist] = useState("Arijit Singh");
  const [toArtist, setToArtist] = useState("The Weeknd");
  const [mood, setMood] = useState(moods[0]);
  const [journey, setJourney] = useState(null);
  const [loading, setLoading] = useState(false);
  const { playQueue, saveJourney } = usePlayer();

  async function handleGenerate() {
    setLoading(true);

    try {
      const nextJourney = await buildBlendJourney({ fromArtist, toArtist, mood });
      setJourney(nextJourney);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="glass-panel p-6 md:p-8">
      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-semibold text-white">Blend Journey</h2>
          <p className="mt-3 text-sm text-slate-400">From one artist to another, smoothly.</p>

          <div className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm text-slate-300">
              Start
              <input
                value={fromArtist}
                onChange={(event) => setFromArtist(event.target.value)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none"
              />
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              Land on
              <input
                value={toArtist}
                onChange={(event) => setToArtist(event.target.value)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none"
              />
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              Mood lane
              <select
                value={mood}
                onChange={(event) => setMood(event.target.value)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none"
              >
                {moods.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={handleGenerate} className="action-button">
              <ArrowRightLeft size={16} />
              Generate
            </button>
            <button
              type="button"
              disabled={!journey}
              onClick={() => {
                if (!journey) {
                  return;
                }
                saveJourney(journey);
              }}
              className="action-button"
            >
              <Save size={16} />
              Save
            </button>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-5">
          {loading ? (
            <div className="flex h-full items-center justify-center text-slate-300">Generating...</div>
          ) : journey ? (
            <div className="space-y-5">
              <div>
                <h3 className="text-2xl font-semibold text-white">{journey.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{journey.summary}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => playQueue(journey.tracks, 0)} className="action-button">
                  Play
                </button>
                <button
                  type="button"
                  onClick={() => {
                    saveJourney(journey);
                    toast.success("Journey saved");
                  }}
                  className="action-button"
                >
                  Save
                </button>
              </div>

              <div className="grid gap-4">
                {journey.tracks.map((track) => (
                  <TrackCard key={track.id} track={track} compact />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-center text-slate-400">
              Generate a blend and play it.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default JourneyBuilder;
