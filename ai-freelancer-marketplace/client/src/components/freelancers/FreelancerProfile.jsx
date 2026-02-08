import { useEffect, useRef } from 'react';
import {
  X,
  Star,
  MapPin,
  Briefcase,
  Calendar,
  Image,
  UserPlus,
} from 'lucide-react';
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

function formatMemberSince(dateStr) {
  const [year, month] = dateStr.split('-');
  const months = [
    'leden', 'únor', 'březen', 'duben', 'květen', 'červen',
    'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec',
  ];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-4 w-4 ${
          star <= Math.round(rating)
            ? 'text-amber-400 fill-amber-400'
            : 'text-slate-300'
        }`}
      />
    ))}
  </div>
);

const FreelancerProfile = ({ freelancer, isOpen, onClose }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !freelancer) return null;

  const initials = getInitials(freelancer.name);
  const bgColor = getAvatarColor(freelancer.name);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/50 backdrop-blur-sm"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto
          bg-white rounded-2xl shadow-xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100
            text-slate-500 hover:text-slate-700 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Zavřít profil"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-start gap-5">
            <div
              className={`flex-shrink-0 w-20 h-20 rounded-full flex items-center
                justify-center text-white font-bold text-2xl ${bgColor}`}
            >
              {initials}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {freelancer.name}
              </h2>
              <p className="text-slate-600 mt-0.5">{freelancer.role}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                  <StarRating rating={freelancer.rating} />
                  <span className="text-sm font-medium text-slate-700">
                    {freelancer.rating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{freelancer.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    freelancer.availability === 'available'
                      ? 'bg-emerald-500'
                      : freelancer.availability === 'busy'
                        ? 'bg-amber-500'
                        : 'bg-slate-400'
                  }`}
                />
                <span className="text-sm text-slate-600">
                  {freelancer.availability === 'available'
                    ? 'Volný/á pro nové projekty'
                    : freelancer.availability === 'busy'
                      ? 'Zaneprázdněný/á'
                      : 'Nedostupný/á'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="px-6 py-4">
          <p className="text-slate-600 leading-relaxed">{freelancer.bio}</p>
        </div>

        {/* Stats */}
        <div className="px-6 pb-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-slate-50 p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Briefcase className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {freelancer.completedProjects}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                dokončených projektů
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Star className="h-4 w-4 text-amber-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {freelancer.rating.toFixed(1)}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                průměrné hodnocení
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Calendar className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="text-sm font-bold text-slate-900">
                {formatMemberSince(freelancer.memberSince)}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                na platformě od
              </div>
            </div>
          </div>
        </div>

        {/* Hourly rate */}
        <div className="px-6 pb-4">
          <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 flex items-center justify-between">
            <span className="text-sm font-medium text-blue-700">
              Hodinová sazba
            </span>
            <span className="text-xl font-bold text-blue-700">
              {freelancer.hourlyRate.toLocaleString('cs-CZ')} Kč/h
            </span>
          </div>
        </div>

        {/* All skills */}
        <div className="px-6 pb-4">
          <h3 className="text-sm font-semibold text-slate-900 mb-2">
            Dovednosti
          </h3>
          <div className="flex flex-wrap gap-2">
            {freelancer.skills.map((skill) => (
              <SkillBadge key={skill} skill={skill} />
            ))}
          </div>
        </div>

        {/* Portfolio */}
        {freelancer.portfolio && freelancer.portfolio.length > 0 && (
          <div className="px-6 pb-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">
              Portfolio
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {freelancer.portfolio.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg bg-slate-100 border border-slate-200
                    aspect-[4/3] flex flex-col items-center justify-center p-3"
                >
                  <Image className="h-8 w-8 text-slate-400 mb-2" />
                  <span className="text-xs text-slate-500 text-center leading-tight">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {freelancer.reviews && freelancer.reviews.length > 0 && (
          <div className="px-6 pb-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Recenze
            </h3>
            <div className="space-y-3">
              {freelancer.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-700">
                        {review.author}
                      </span>
                      <StarRating rating={review.rating} />
                    </div>
                    <span className="text-xs text-slate-500">
                      {review.date}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="px-6 py-5 border-t border-slate-100">
          <button
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700
              text-white font-medium transition-colors duration-200
              flex items-center justify-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Přidat do projektu
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
