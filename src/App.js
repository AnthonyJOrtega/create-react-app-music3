import './App.css';
import Sidebar from './components/sidebar';
import Player from './components/Player';
import Display from './components/Display';
import { useContext } from 'react';
import {PlayerContext} from './context/PlayerContext';
import React from 'react';


function App() {

const { audioRef, track } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />
        <Display />
      </div>
      <Player />
      <audio ref={audioRef} src ={track.file} preload="auto"></audio>
    </div>
  );
}

export default App;
