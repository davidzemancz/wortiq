import { useState } from 'react';
import { Star, MapPin, Briefcase, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import SkillMatchChart from './SkillMatchChart';

const availabilityConfig = {
  available: { label: 'Volný ihned', color: 'text-emerald-600 bg-emerald-50', dot: 'bg-emerald-500' },
  partial: { label: 'Částečně obsazený', color: 'text-amber-600 bg-amber-50', dot: 'bg-amber-500' },
  busy: { label: 'Obsazený', color: 'text-red-600 bg-red-50', dot: 'bg-red-500' },
};

function AvatarInitials({ name, className = '' }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colors = [
    'bg-blue-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500',
    'bg-cyan-500', 'bg-rose-500', 'bg-indigo-500', 'bg-teal-500',
  ];
  const colorIndex = name.length % colors.length;

  return (
    <div
      className={`flex items-center justify-center rounded-full text-white font-bold ${colors[colorIndex]} ${className}`}
    >
      {initials}
    </div>
  );
}

function MatchScoreBadge({ score }) {
  let bgColor, textColor, glowColor;
  if (score >= 90) {
    bgColor = 'bg-emerald-100';
    textColor = 'text-emerald-700';
    glowColor = 'shadow-emerald-200';
  } else if (score >= 75) {
    bgColor = 'bg-violet-100';
    textColor = 'text-violet-700';
    glowColor = 'shadow-violet-200';
  } else {
    bgColor = 'bg-amber-100';
    textColor = 'text-amber-700';
    glowColor = 'shadow-amber-200';
  }

  return (
    <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${bgColor} ${textColor} shadow-sm ${glowColor}`}>
      <Zap className="w-3 h-3" />
      {score}%
    </div>
  );
}

function SkillBar({ skill, matched }) {
  const width = matched ? 85 + Math.floor(Math.random() * 15) : 30 + Math.floor(Math.random() * 30);
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-500 w-20 truncate flex-shrink-0">{skill}</span>
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            matched ? 'bg-violet-500' : 'bg-slate-300'
          }`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function FreelancerCard({ freelancer, matchScore, taskTitle, taskSkills = [] }) {
  const [expanded, setExpanded] = useState(false);
  const availability =
    availabilityConfig[freelancer.availability] || availabilityConfig.available;

  const freelancerSkillsLower = (freelancer.skills || []).map((s) => s.toLowerCase());

  return (
    <div
      className="group rounded-xl shadow-sm border border-slate-200 bg-white p-5 hover:shadow-lg hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex gap-4">
        {/* Avatar with availability indicator */}
        <div className="relative flex-shrink-0">
          <AvatarInitials name={freelancer.name} className="w-14 h-14 text-base" />
          <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white ${availability.dot}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h4 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                {freelancer.name}
              </h4>
              <p className="text-xs text-slate-500">{freelancer.role}</p>
            </div>
            {matchScore != null && <MatchScoreBadge score={matchScore} />}
          </div>

          {taskTitle && (
            <p className="text-xs text-blue-600 font-medium mb-2.5">
              Úkol: {taskTitle}
            </p>
          )}

          {/* Stats row */}
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-semibold text-slate-700">{freelancer.rating}</span>
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" />
              {freelancer.completedProjects} projektů
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {freelancer.location}
            </span>
          </div>

          {/* Skill tags with match highlighting */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {freelancer.skills?.slice(0, expanded ? undefined : 4).map((skill) => {
              const isMatched = taskSkills.some(
                (ts) => ts.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(ts.toLowerCase())
              );
              return (
                <span
                  key={skill}
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                    isMatched
                      ? 'bg-violet-100 text-violet-700 ring-1 ring-violet-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {skill}
                </span>
              );
            })}
            {!expanded && freelancer.skills?.length > 4 && (
              <span className="rounded-full px-2.5 py-0.5 text-xs bg-slate-100 text-slate-400">
                +{freelancer.skills.length - 4}
              </span>
            )}
          </div>

          {/* Price and availability */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900">
              {freelancer.hourlyRate} Kč/h
            </span>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${availability.color}`}>
                {availability.label}
              </span>
              <button
                className="text-slate-400 hover:text-blue-500 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
                aria-label={expanded ? 'Skrýt detaily' : 'Zobrazit detaily'}
              >
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable detail section */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Skill match bars */}
            <div>
              <h5 className="text-xs font-semibold text-slate-700 mb-2">Pokrytí dovedností</h5>
              <div className="space-y-2">
                {(taskSkills.length > 0 ? taskSkills : freelancer.skills || []).slice(0, 5).map((skill) => (
                  <SkillBar
                    key={skill}
                    skill={skill}
                    matched={freelancerSkillsLower.some(
                      (fs) => fs.includes(skill.toLowerCase()) || skill.toLowerCase().includes(fs)
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Radar chart */}
            {taskSkills.length >= 3 && (
              <div>
                <h5 className="text-xs font-semibold text-slate-700 mb-2">Profil shody</h5>
                <SkillMatchChart freelancer={freelancer} taskSkills={taskSkills} />
              </div>
            )}
          </div>

          {/* Portfolio preview */}
          {freelancer.portfolio?.length > 0 && (
            <div className="mt-4">
              <h5 className="text-xs font-semibold text-slate-700 mb-2">Portfolio</h5>
              <div className="flex gap-2">
                {freelancer.portfolio.slice(0, 3).map((item, i) => (
                  <div
                    key={i}
                    className="flex-1 h-16 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center text-xs text-slate-500 font-medium hover:border-blue-300 transition-colors"
                  >
                    {item.title?.slice(0, 12) || `Projekt ${i + 1}`}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
