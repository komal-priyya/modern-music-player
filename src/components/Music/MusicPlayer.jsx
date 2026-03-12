import React, { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useMusicStore } from '../../store/musicStore';

const MusicPlayer = () => {
  const { currentTrack, isPlaying, setIsPlaying, setCurrentTrack } = useMusicStore();
  const [volume, setVolume] = useState(0.7);
  const [duration, setDuration] = useState(0);
  const [seek, setSeek] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const soundRef = useRef(null);

  useEffect(() => {
    if (currentTrack) {
      if (soundRef.current) {
        soundRef.current.unload();
      }

      soundRef.current = new Howl({
        src: [currentTrack.audio],
        html5: true,
        volume: volume,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onend: () => handleNext(),
        onload: () => setDuration(soundRef.current.duration()),
        onseek: () => setSeek(soundRef.current.seek())
      });

      soundRef.current.play();
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [currentTrack]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(volume);
    }
  }, [volume]);

  const togglePlay = () => {
    if (!soundRef.current) return;
    
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  };

  const handleNext = () => {
    // Implement next track logic
  };

  const handlePrev = () => {
    // Implement previous track logic
  };

  const handleSeek = (e) => {
    const { value } = e.target;
    setSeek(value);
    if (soundRef.current) {
      soundRef.current.seek(value);
    }
  };

  const toggleMute = () => {
    if (soundRef.current) {
      soundRef.current.mute(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900 to-blue-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center space-x-4 w-1/4">
          <img 
            src={currentTrack.image || 'https://via.placeholder.com/50'} 
            alt={currentTrack.name}
            className="w-12 h-12 rounded-lg"
          />
          <div>
            <h4 className="font-semibold">{currentTrack.name}</h4>
            <p className="text-sm text-gray-300">{currentTrack.artist_name}</p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center w-2/4">
          <div className="flex items-center space-x-6">
            <button onClick={handlePrev} className="hover:text-purple-300 transition">
              <FaBackward size={20} />
            </button>
            <button 
              onClick={togglePlay}
              className="bg-white text-purple-900 rounded-full p-3 hover:scale-110 transition"
            >
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <button onClick={handleNext} className="hover:text-purple-300 transition">
              <FaForward size={20} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full mt-2 flex items-center space-x-2">
            <span className="text-xs">{formatTime(seek)}</span>
            <input
              type="range"
              min={0}
              max={duration}
              value={seek}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 w-1/4 justify-end">
          <button onClick={toggleMute} className="hover:text-purple-300">
            {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default MusicPlayer;