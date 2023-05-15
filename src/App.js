import './App.css';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import React, {useState, useCallback, useEffect} from 'react';
import Spotify from './components/Spotify/Spotify';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('');

  const addTrack = useCallback((track) => {
    if (playlistTracks.some((currentTrack) => currentTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  }, [playlistTracks]);
  
  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);
  
  const updateName = useCallback((name) => {
    setPlaylistName({playlistName: name});
  }, []);

  const submitPlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => {
      return track.uri;
    });

    Spotify.savePlaylist(playlistName.playlistName, trackUris);

    setPlaylistName("");
    setPlaylistTracks([]);

  }, [playlistName, playlistTracks]);

  const search = (term) => {
    Spotify.search(term).then((results) => {
      setSearchResults(results);
    });
  }
  
  const getAccessToken = () => {
    Spotify.getAccessToken();
  }
  
  useEffect(() => {
    getAccessToken();
  }, []);
  
  return (
    <div className="App">
      <header className='App-search'>
        <h1>Jammming</h1>
        <SearchBar 
          onSearch={search}
        />
      </header>
      <main className='App-main' id='playlist-lab'>
        <div className='tracklist container'>
          <SearchResults trackResults={searchResults} onAdd={addTrack}/>
        </div>
        <div className='playlist container'>
          <Playlist 
            playlist={playlistTracks} 
            name={playlistName} 
            onRemove={removeTrack}
            onChange={updateName}
            onSubmit={submitPlaylist}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
