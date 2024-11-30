// components/VideoEmbed.js
const VideoEmbed = () => {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "56.25%", // 16:9 aspect ratio
        height: 0,
        overflow: "hidden",
        borderRadius: "1rem", // Rounded corners for a modern look
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Shadow for depth
      }}
    >
      <iframe
        src="https://www.youtube.com/embed/ZkI_khA81aY?si=3Jf8h-c4szRBSTSb"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "1rem",
        }}
      ></iframe>
    </div>
  );
};

export default VideoEmbed;
