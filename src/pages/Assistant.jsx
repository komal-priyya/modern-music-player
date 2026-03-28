import { useState } from "react";
import toast from "react-hot-toast";
import { MessageCircle, Music4, Send } from "lucide-react";
import TrackCard from "../components/Music/TrackCard";
import { usePlayer } from "../hooks/usePlayer";
import { getAssistantReply } from "../services/musicAssistant";

const starterPrompts = [
  'make me a late night playlist',
  'who sings "tum hi ho"',
  "sad hindi night playlist",
];

function Assistant() {
  const { playQueue, createPlaylist, addTracksToPlaylist } = usePlayer();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Ask me to build a fresh playlist or help identify a song.",
      tracks: [],
    },
  ]);

  async function handleSubmit(event) {
    event.preventDefault();
    const value = prompt.trim();

    if (!value) {
      return;
    }

    setMessages((current) => [...current, { role: "user", text: value }]);
    setPrompt("");
    setLoading(true);

    try {
      const reply = await getAssistantReply(value);
      setMessages((current) => [...current, { role: "assistant", ...reply }]);
    } catch {
      toast.error("Assistant could not respond");
    } finally {
      setLoading(false);
    }
  }

  function saveReplyAsPlaylist(message) {
    if (!message.tracks?.length) {
      return;
    }

    const playlistId = createPlaylist(message.playlistName || "Assistant playlist");
    addTracksToPlaylist(playlistId, message.tracks);
    toast.success("Playlist created from assistant");
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 p-3 text-white">
            <MessageCircle size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Muzify AI DJ</h1>
            <p className="text-sm text-slate-400">Fresh playlists and song finder</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {starterPrompts.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPrompt(item)}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
            >
              {item}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 md:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <Music4 size={18} className="text-slate-400" />
            <input
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Make me a playlist or identify a song..."
              className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
            />
          </div>
          <button type="submit" className="action-button">
            <Send size={16} />
            Send
          </button>
        </form>
      </section>

      <section className="glass-panel p-4 sm:p-6">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className="space-y-4">
              <div
                className={`rounded-3xl px-4 py-4 text-sm leading-6 ${
                  message.role === "user"
                    ? "ml-auto max-w-2xl bg-gradient-to-r from-orange-400 to-pink-500 text-white"
                    : "max-w-3xl border border-white/10 bg-white/5 text-slate-200"
                }`}
              >
                {message.text}
              </div>

              {message.tracks?.length ? (
                <>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => playQueue(message.tracks, 0)}
                      className="action-button"
                    >
                      Play all
                    </button>

                    {message.intent === "playlist" ? (
                      <button
                        type="button"
                        onClick={() => saveReplyAsPlaylist(message)}
                        className="action-button"
                      >
                        Save to library
                      </button>
                    ) : null}
                  </div>

                  <div className="grid gap-4 xl:grid-cols-2">
                    {message.tracks.map((track) => (
                      <TrackCard key={`${track.id}-${index}`} track={track} compact />
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          ))}

          {loading ? <p className="text-slate-400">Thinking...</p> : null}
        </div>
      </section>
    </div>
  );
}

export default Assistant;
