import React, { useEffect, useRef } from 'react';
import { getRandomSong } from '../Utils/AudioManager';

type AudioPlayerProps = {
    isPlaying: boolean;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying }) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const playRandomSong = () => {
        const randomSong = getRandomSong();
        if (audioRef.current) {
            audioRef.current.src = randomSong;
            audioRef.current.play();
        }
    };

    useEffect(() => {
        if (isPlaying) {
            playRandomSong();
        } else if (audioRef.current) {
            audioRef.current.pause();
        }

        const handleEnded = () => {
            if (isPlaying) {
                playRandomSong();
            }
        };

        if (audioRef.current) {
            audioRef.current.addEventListener('ended', handleEnded);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('ended', handleEnded);
            }
        };
    }, [isPlaying]);

    return <audio ref={audioRef} />;
};

export default AudioPlayer;
