function CenteredIframe({ src }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <iframe
        src={src}
        width="600"
        height="400"
        style={{ border: "none" }}
        title="Centered Iframe"
      />
    </div>
  );
}

export default CenteredIframe;
