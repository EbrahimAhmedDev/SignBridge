import style from "./services.module.css";
import { FaFont, FaHands, FaVideo } from "react-icons/fa"; // استيراد الأيقونات

const Services = () => {
  const coreServices = [
    {
      title: "Text to sign language",
      desc: "Convert written text into accurate sign language animation in real time.",
      icon: <FaFont />,
    },
    {
      title: "Sign language to Text",
      desc: "Convert written text into accurate sign language animation in real time.",
      icon: <FaHands />,
    },
    {
      title: "Learning",
      desc: "Convert written text into accurate sign language animation in real time.",
      icon: <FaVideo />,
    },
  ];

  return (
    <section className={style.servicesSection}>
      <h2 className={style.mainTitle}>Our Core Services</h2>
      <p className={style.subTitle}>
        SignBridge offers a comprehensive suite of tools to facilitate
        communication and learning
      </p>

      <div className={style.servicesGrid}>
        {coreServices.map((service, index) => (
          <div key={index} className={style.serviceCard}>
            <div className={style.iconCircle}>{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
