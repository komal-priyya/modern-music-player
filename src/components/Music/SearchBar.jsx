import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { musicAPI } from '../../lib/api';
import { FaSearch } from 'react-icons/fa';
import TrackCard from './TrackCard';
import { useDebounce } from '../../hooks/useDebounce';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: tracks, isLoading, error } = useQuery({
    queryKey: ['searchTracks', debouncedSearch],
    queryFn: () => musicAPI.searchTracks(debouncedSearch),
    enabled: debouncedSearch.length > 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for songs, artists, albums..."
          className="w-full px-6 py-4 pl-14 text-lg bg-gray-900 text-white rounded-full border-2 border-purple-500 focus:outline-none focus:border-purple-400 transition"
        />
        <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
      </div>

      {isLoading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500">
          Error loading tracks. Please try again.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tracks?.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>

      {tracks?.length === 0 && debouncedSearch && (
        <p className="text-center text-gray-400 mt-8">No tracks found</p>
      )}
    </div>
  );
};

export default SearchBar;