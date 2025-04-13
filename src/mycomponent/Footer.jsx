import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-white py-6 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Logo & Copyright */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">Plates4All</h2>
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-sm">
          <a href="/about" className="hover:text-gray-400">About Us</a>
          <a href="/contact" className="hover:text-gray-400">Contact</a>
          <a href="/faq" className="hover:text-gray-400">FAQ</a>
          <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
        </nav>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white"><FaFacebook size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;