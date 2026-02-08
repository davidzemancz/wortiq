import { motion } from 'framer-motion';
import { Star, MapPin, Briefcase } from 'lucide-react';
import SkillBadge from './SkillBadge';

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

const avatarColors = [
  'bg-blue-500',
  'bg-violet-500',
  'bg-cyan-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-indigo-500',
  'bg-teal-500',
];

function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

const FreelancerCard = ({ freelancer, onOpenProfile }) => {
  const initials = getInitials(freelancer.name);
  const bgColor = getAvatarColor(freelancer.name);

  return (
    <div
      className="rounded-xl border border-slate-200 bg-white shadow-sm
        hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden"
    >
      <div className="p-6">
        {/* Avatar + basic info */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center
              justify-center text-white font-bold text-lg ${bgColor}`}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900 truncate">
              {freelancer.name}
            </h3>
            <p className="text-sm text-slate-600">{freelancer.role}</p>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                <span className="text-sm font-medium text-slate-700">
                  {freelancer.rating.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                <MapPin className="h-3.5 w-3.5" />
                <span className="text-xs">{freelancer.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {freelancer.skills.slice(0, 3).map((skill) => (
            <SkillBadge key={skill} skill={skill} />
          ))}
          {freelancer.skills.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 text-xs text-slate-500">
              +{freelancer.skills.length - 3}
            </span>
          )}
        </div>

        {/* Rate + projects */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <span className="text-lg font-bold text-slate-900">
              {freelancer.hourlyRate.toLocaleString('cs-CZ')} Kč
            </span>
            <span className="text-sm text-slate-500">/h</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <Briefcase className="h-3.5 w-3.5" />
            <span className="text-sm">
              {freelancer.completedProjects} projektů
            </span>
          </div>
        </div>

        {/* Availability indicator */}
        <div className="flex items-center gap-2 mt-3">
          <span
            className={`h-2 w-2 rounded-full ${
              freelancer.availability === 'available'
                ? 'bg-emerald-500'
                : freelancer.availability === 'busy'
                  ? 'bg-amber-500'
                  : 'bg-slate-400'
            }`}
          />
          <span className="text-xs text-slate-500">
            {freelancer.availability === 'available'
              ? 'Volný/á'
              : freelancer.availability === 'busy'
                ? 'Zaneprázdněný/á'
                : 'Nedostupný/á'}
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-5">
        <button
          onClick={() => onOpenProfile(freelancer.id)}
          className="w-full py-2.5 rounded-lg border border-slate-300 text-sm font-medium
            text-slate-700 hover:border-blue-500 hover:text-blue-600
            transition-all duration-200"
        >
          Zobrazit profil
        </button>
      </div>
    </div>
  );
};

const FreelancerBrowser = ({ freelancers, onOpenProfile }) => {
  if (freelancers.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-3">🔍</div>
        <h3 className="text-lg font-medium text-slate-700 mb-1">
          Žádní freelanceři nenalezeni
        </h3>
        <p className="text-sm text-slate-500">
          Zkuste upravit filtry pro více výsledků.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-slate-500 mb-4">
        {freelancers.length}{' '}
        {freelancers.length === 1
          ? 'freelancer'
          : freelancers.length < 5
            ? 'freelanceři'
            : 'freelancerů'}
      </p>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {freelancers.map((freelancer) => (
          <motion.div
            key={freelancer.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
            }}
          >
            <FreelancerCard
              freelancer={freelancer}
              onOpenProfile={onOpenProfile}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FreelancerBrowser;
