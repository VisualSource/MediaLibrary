import { useEffect, useRef } from "react";
import videojs from "video.js";

type MediaOptions = {
    src: string;
    type: string;
    thumbnail: string
}

const getFileUri = (value: string) => {
    return `${import.meta.env.VITE_API_BASE_URL}${value.replace("/api", "")}`;
}

const MediaPlayer: React.FC<MediaOptions> = ({ src, thumbnail, type }) => {
    const video = useRef<HTMLDivElement>(null);
    const mediaPlayer = useRef<ReturnType<typeof videojs>>();

    useEffect(() => {
        if (video.current) {
            if (!mediaPlayer.current) {
                const el = document.createElement("video-js");

                el.classList.add('vjs-big-play-centered');
                video.current.appendChild(el);

                mediaPlayer.current = videojs(el, {
                    autoplay: false,
                    controls: true,
                    controlBar: {
                        skipButtons: {
                            forward: 10,
                            backward: 10
                        }
                    },
                    poster: thumbnail,
                    enableDocumentPictureInPicture: true,
                    fluid: true,
                    responsive: true,
                    sources: [{
                        src: getFileUri(src),
                        type
                    }]
                }, () => {
                    videojs.log("Player is ready");
                });
            } else {
                const player = mediaPlayer.current;
                player.src(getFileUri(src));
                player.poster(thumbnail);
            }
        }
    }, [src, thumbnail, type]);

    return (
        <div data-vjs-player>
            <div ref={video}></div>
        </div>
    );
}

export default MediaPlayer;