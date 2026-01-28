import { useEffect } from "react";
import Feature from "../components/feature/Feature";
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import Services from "../components/services/Services";
import WhyLearn from "../components/whyLearn/WhyLearn";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="home">
      <Hero />
      <Services />
      <Feature />
      <WhyLearn />
      <Footer />
    </main>
  );
};

export default Home;
