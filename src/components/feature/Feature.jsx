import { Link } from "react-router-dom"; // استيراد المكون الأساسي للتنقل
import style from "./feature.module.css";
import img1 from "../../assets/featureRow1.png";
import img2 from "../../assets/featureRow2.png";
import img3 from "../../assets/featureRow3.png";

const FeatureSection = () => {
  const features = [
    {
      id: 1,
      image: img1,
      text: "Our AI-powered system recognizes sign language gestures through the camera and instantly converts them into written text. This feature helps bridge communication between Deaf individuals and non-signers in real time.",
      link: "/sign-to-text",
      btnText: "Translate Sign to Text",
      isReversed: false,
    },
    {
      id: 2,
      image: img2,
      text: "Type any sentence and the system will translate it into sign language using a 3D animated avatar. Making communication easier for non-signers who want to speak to Deaf users.",
      link: "/text-to-sign",
      btnText: "Convert Text to Sign",
      isReversed: true,
    },
    {
      id: 3,
      image: img3,
      text: "A learning space for beginners to master the basics of sign language through interactive lessons. Learn the alphabet, numbers, colors, and common phrases with visual examples and practice mode.",
      link: "/learning", // تم تصحيح الكلمة من learnin لـ learning
      btnText: "Start Learning",
      isReversed: false,
    },
  ];

  return (
    <section className={style.sectionContainer}>
      {features.map((item) => (
        <div
          key={item.id}
          className={`${style.featureCard} ${
            item.isReversed ? style.reversed : ""
          }`}
        >
          <div className={style.imageWrapper}>
            <img src={item.image} alt={item.btnText} />
          </div>
          <div className={style.textWrapper}>
            <p className={style.featureText}>{item.text}</p>
            {/* استبدلنا الـ button بمكون الـ Link */}
            <Link to={item.link} className={style.actionBtn}>
              {item.btnText}
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeatureSection;
