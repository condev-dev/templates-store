const ImagePlaceholder = ({ width, height }) => {
  return (
    <div
      className="w-100  rounded-3 d-flex justify-content-center align-items-center flex-column"
      style={{
        height: height,
        width: width,
        background: "#1e293b",
        color: "#f8fafc",
      }}
    >
      <h4>Con Dev</h4>
      <small className="mt-3">Not Found</small>
    </div>
  );
};

export default ImagePlaceholder;
