import React from "react";
import {assets} from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { albumsData, songsData } from "../assets/assets"; 
import { useContext,  } from "react";
import { PlayerContext } from "../context/PlayerContext";


const Sidebar = () => {

    const navigate = useNavigate();

    const [isFocused, setIsFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputClick = () => {
            setIsFocused(true);
    };

    const handleBlur = () => {
        if (!searchTerm) {
            setIsFocused(false);
        }
    };

      // Filtrar datos (insensible a mayúsculas)
    const filteredAlbums = albumsData.filter((album) =>
        album.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredSongs = songsData.filter((song) =>
        song.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const { playWithId } = useContext(PlayerContext);

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex ">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        
            {/* HOME*/}
            <div onClick={() => navigate("/")} className="flex items-center gap-3 pl-8 cursor-pointer">
                <img className="w-6" src={assets.home_icon} alt="" />
                    <p className='font-bold'> Home </p>           
            </div>

            {/* BUSCAR */}
            <div className="flex items-center gap-3 pl-8 cursor-pointer">
                    <img className="w-6" src={assets.search_icon} alt="" />
                        <p className='font-bold'></p>

                 {/* Input que aparece al hacer clic */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isFocused ? 'w-64 opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none bg-black"
          placeholder="Buscar..."
        />

        {/* Resultados */}
        {searchTerm && (
          <div className="absolute top left-0 mt-1 w-64 bg-white rounded-md shadow-lg border max-h-60 overflow-y-auto z-50">
            {filteredAlbums.length === 0 && filteredSongs.length === 0 ? (
              <p className="px-4 py-2 text-sm text-gray-500">No encontrado</p>
            ) : (
              <>
                {/* Mostrar álbumes */}
                {filteredAlbums.map((album) => (
                  <div  onClick={() => {navigate(`/album/${album.id}`); setSearchTerm("");}} 
                    key={album.id}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <img src={album.image} alt={album.name} className="w-8 h-8 rounded" />
                    <span className="text-sm text-gray-800">{album.name}</span>
                  </div>
                ))}

                {/* Mostrar canciones */}
                {filteredSongs.map((song) => (
                  <div  onClick={() => { playWithId(song.id); setSearchTerm("");}}
                    key={song.id}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <img src={song.image} alt={song.name} className="w-8 h-8 rounded" />
                    <span className="text-sm text-gray-800">{song.name}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Texto "Buscar" (solo visible si no está enfocado) */}
      {!isFocused && (
        <p
          className="font-bold cursor-pointer"
          onClick={() => setIsFocused(true)}
        >
          Buscar
        </p>
      )}
            </div>
        
        </div>

        {/* Libreria */}
        <div className="bg-[#121212] h-[85%] rounded">
                 <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                      <img className="w-8" src={assets.stack_icon} alt="" />
                          <p className='font-bold'> Tú Libreria </p>
                      </div>
                      <div className="flex items-center gap-3">
                              <img className="w-5" src={assets.arrow_icon} alt="" />
                              <img className="w-5" src={assets.plus_icon} alt="" />
                      </div>
                  </div> 

                  <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 p1-4">
                        <h1> Crear tu primera lista</h1>
                        <p className="font-light"> Es fácil, nosotros te ayudamos </p>
                        <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Crear Playlist</button>
                  </div>

                  <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 p1-4 mt-4">
                        <h1> vamos a encontrar algunos podcasts para seguir</h1>
                        <p className="font-light"> Es fácil, nosotros te ayudamos a subir nuevos episodios </p>
                        <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Navegar por el podcast</button>
                  </div>
        </div> 

    </div>
    
  )
}

export default Sidebar
