// src/context/VideoContext.js
import React, { createContext, useContext, useState } from 'react';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
    const [videoLoaded, setVideoLoaded] = useState(false);

    return (
        <VideoContext.Provider value={{ videoLoaded, setVideoLoaded }}>
            {children}
        </VideoContext.Provider>
    );
};

export const useVideo = () => {
    return useContext(VideoContext);
};
