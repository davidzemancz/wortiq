import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <Zap className="h-5 w-5 text-blue-400" />
              <span>Wortiq</span>
            </div>
            <p className="text-sm">
              AI-powered freelancer marketplace pro český trh. Popište projekt, AI sestaví tým.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Navigace</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Domů
                </Link>
              </li>
              <li>
                <Link to="/new-project" className="hover:text-white transition-colors">
                  Zadat projekt
                </Link>
              </li>
              <li>
                <Link to="/freelancers" className="hover:text-white transition-colors">
                  Freelanceři
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Kontakt</h3>
            <ul className="space-y-2 text-sm">
              <li>info@wortiq.cz</li>
              <li>Praha, Česká republika</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Wortiq. Demo aplikace.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
