
import style from './hero.module.css';

const Hero = () => {
  return (
    <section className={style.hero}>
      <div className={style.glassCard}>
        <h1 className={style.heroTitle}>What is the silent speech</h1>
        <p className={style.heroText}>
          Sign language is not just hand movements — it's the voice of people 
          who were never heard. At SignBridge our mission is to bridge the gap 
          between the Deaf and the hearing community with simple, friendly, 
          and modern tools anyone can use.
        </p>
      </div>
    </section>
  );
};

export default Hero;