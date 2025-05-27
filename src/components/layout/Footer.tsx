
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-police-dark text-white py-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Surat Crime Connect</h3>
            <p className="text-sm opacity-80">
              Bringing awareness, community discussions, and real-time crime updates
              for the citizens of Surat, Gujarat.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/news" className="hover:underline">News</Link></li>
              <li><Link to="/community" className="hover:underline">Community</Link></li>
              <li><Link to="/about" className="hover:underline">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@suratcrimeconnect.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Surat, Gujarat, India</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Emergency</h3>
            <div className="space-y-2 text-sm">
              <p>Police Control Room: 100</p>
              <p>Women Helpline: 1091</p>
              <p>Ambulance: 108</p>
              <p>Surat City Police: 0261-2414151</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm opacity-70">
          <p>© {new Date().getFullYear()} Surat Crime Connect. All rights reserved.</p>
          <p className="mt-1">
            Developed by Kevin Desai, Aditya Diwan, Jay Panchal, Harry Mehta
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
