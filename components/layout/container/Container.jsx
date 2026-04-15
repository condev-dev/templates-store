import "./index.css";
const Container = ({ children }) => {
  return (
    <section className="main-container d-flex flex-column">{children}</section>
  );
};

export default Container;
