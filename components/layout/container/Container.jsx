import "./index.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import CheckLayout from "./CheckLayout";

const Container = ({ children }) => {
  return (
    <section className="main-container d-flex flex-column ">
      <CheckLayout>
        <Header />
      </CheckLayout>
      {children}
      <CheckLayout>
        <Footer />
      </CheckLayout>
    </section>
  );
};

export default Container;
