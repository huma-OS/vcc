import React from "react";

interface VideoModalProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, onClose }) => {
  return (
    <div className="video-modal-overlay" onClick={onClose}>
       {/* <button className="video-modal-close" onClick={onClose}> */}
      <button className="video-modal-close-button" onClick={onClose}>
        {/* X */}
      </button>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="video-modal-iframe-container">
          <iframe
            src={videoUrl}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            title="Video"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
