import { Link } from 'react-router-dom';
import { Home, SearchX } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mb-8">
          <SearchX className="w-24 h-24 mx-auto text-slate-300" strokeWidth={1.5} />
        </div>

        <h1 className="text-4xl font-bold text-slate-800 mb-3">404</h1>
        <p className="text-xl text-slate-600 mb-2">Tato stránka neexistuje</p>
        <p className="text-slate-500 mb-8">
          Stránka, kterou hledáte, byla přesunuta nebo neexistuje.
        </p>

        <Link to="/">
          <Button variant="primary" size="md">
            <Home className="w-4 h-4" />
            Zpět na úvodní stránku
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
