import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import footerFace from '../../assets/footer-face.svg';
import footerTwitter from '../../assets/footer-twitter.svg';
import footerLinkedIn from '../../assets/footer-linked-in.svg';
import footerInsta from '../../assets/footer-insta.svg';
import locationIcon from '../../assets/location.svg';
import mailIcon from '../../assets/mail.svg';
import phoneIcon from '../../assets/phone.svg';
import './Footer.css';

const quickLinks = [
  { label: 'The Project', to: '/the-project' },
  { label: 'The Center', to: '/the-center' },
  { label: 'News', to: '/news' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact Us', to: '/contact-us' },
  // { label: 'Private Area', to: '/private-area' },
];

const socialLinks = [
  { label: 'Facebook', href: '#', icon: footerFace },
  { label: 'Twitter', href: '#', icon: footerTwitter },
  { label: 'LinkedIn', href: '#', icon: footerLinkedIn },
  { label: 'Instagram', href: '#', icon: footerInsta },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          {/* Column 1: Logo & Description */}
          <div className="footer__col footer__col--brand">
            <Link to="/" className="footer__logo">
              <img src={logo} alt="RCCR" />
            </Link>
            <p className="footer__description">
              Dedicated to preserving and restoring Jordan&apos;s archaeological heritage for future
              generations through expert conservation and sustainable practices.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer__col">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__links">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="footer__col">
            <h4 className="footer__heading">Contact Us</h4>
            <ul className="footer__contact">
              <li>
                <img src={locationIcon} alt="" aria-hidden />
                <span>Archaeological Site of Jerash Jerash, Jordan</span>
              </li>
              <li>
                <img src={phoneIcon} alt="" aria-hidden />
                <a href="tel:+962626342196">+962 6 263 42196</a>
              </li>
              <li>
                <img src={mailIcon} alt="" aria-hidden />
                <a href="mailto:info@rccr-jerash.jo">info@rccr-jerash.jo</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="footer__col">
            <h4 className="footer__heading">Follow Us</h4>
            <p className="footer__follow-text">Stay connected and follow our conservation journey</p>
            <div className="footer__social">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="footer__social-link"
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={item.icon} alt="" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2025 Regional Center for Conservation and Restoration. All rights reserved.
          </p>
          <div className="footer__policies">
            <Link to="/privacy-policy" className="footer__policy-link">
              Privacy Policy
            </Link>
            <Link to="/terms-of-use" className="footer__policy-link">
              Terms of Use
            </Link>
            <Link to="/accessibility" className="footer__policy-link">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
