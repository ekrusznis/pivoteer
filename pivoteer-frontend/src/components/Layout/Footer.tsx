import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-deepIndigo text-brightWhite py-10 px-6 mt-20 border-t border-purple-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Logo & Legal Info */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <img src="/logo.svg" alt="MyPivoteer Logo" className="h-12" />
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} MyPivoteer LLC. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 text-center md:text-left max-w-sm">
            MyPivoteer™ and its logo are trademarks of MyPivoteer LLC. Unauthorized use is prohibited.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row gap-4 text-sm text-center">
          <Link to="/terms" className="hover:text-neonPink transition-colors">Terms</Link>
          <Link to="/privacy" className="hover:text-neonPink transition-colors">Privacy</Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4 justify-center">
          <a href="https://x.com/MyPivoteer" target="_blank" rel="noopener noreferrer" className="hover:text-neonPink transition-colors">
            <FaXTwitter size={20} />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61575327668627#" target="_blank" rel="noopener noreferrer" className="hover:text-neonPink transition-colors">
            <FaFacebookF size={20} />
          </a>
          <a href="https://www.linkedin.com/company/106261885" target="_blank" rel="noopener noreferrer" className="hover:text-neonPink transition-colors">
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
