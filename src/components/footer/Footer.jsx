import style from "./footer.module.css";
import { Link } from "react-router-dom";
import logoSingle from "../../assets/singlelogo.png";

const Footer = () => {
  const quickLinks = [
    { name: "Home page", path: "/" },
    { name: "Sign to text", path: "/sign-to-text" },
    { name: "Text to sign", path: "/text-to-sign" },
    { name: "Start Learning", path: "/learning" },
  ];

  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style.brandCol}>
          <div className={style.logoWrapper}>
            <img src={logoSingle} alt="SignBridge Logo" className={style.logo} />
            <span className={style.brandName}>SignBridge</span>
          </div>
          <p className={style.brandDesc}>
            Connecting people through visual language and building bridges
            between communities.
          </p>
        </div>

        <div className={style.linksCol}>
          <h4 className={style.colTitle}>Quick Links</h4>
          <ul className={style.linksList}>
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link onClick={() => window.scrollTo(0, 0)} to={link.path}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={style.aboutCol}>
          <h4 className={style.colTitle}>About Us</h4>
          <p className={style.aboutText}>
            We are a team of six passionate university students building an
            AI-powered project to empower the Deaf community. With diverse
            skills in development, design, and research, we share one vision —
            making communication accessible for everyone. Proudly built by the
            deaf community.
          </p>
        </div>
      </div>

      <div className={style.bottomBar}>
        <p>
          © {new Date().getFullYear()} Sign Language Information Hub.
          Educational purposes.
        </p>
        <p>Made with ❤️ by the SignBridge Team</p>
      </div>
    </footer>
  );
};

export default Footer;
