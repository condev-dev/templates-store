const ImagePlaceholder = () => {
  return (
    <div
      className="w-100 h-100 rounded-3 d-flex justify-content-center align-items-center flex-column image-placeholder-container"
      style={{
        background: "#1e293b",
        color: "#f8fafc",
      }}
    >
      <h4 style={{ fontSize: "clamp(12px, 20vw, 26px)" }}>Con Dev</h4>
      <small className="mt-3">Not Found</small>
    </div>
  );
};

export default ImagePlaceholder;
