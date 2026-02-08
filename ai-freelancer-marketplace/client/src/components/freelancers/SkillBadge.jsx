const categoryColors = {
  'Web Development': 'blue',
  'Design': 'violet',
  'Marketing': 'amber',
  'Copywriting': 'cyan',
  'Video': 'red',
  'Data': 'emerald',
  'DevOps': 'slate',
};

function getColor(skill) {
  for (const [category, color] of Object.entries(categoryColors)) {
    if (skill.toLowerCase().includes(category.toLowerCase())) return color;
  }
  return 'blue';
}

const colorMap = {
  blue: 'bg-blue-100 text-blue-700',
  violet: 'bg-violet-100 text-violet-700',
  cyan: 'bg-cyan-100 text-cyan-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  red: 'bg-red-100 text-red-700',
  slate: 'bg-slate-100 text-slate-700',
};

const SkillBadge = ({ skill, color, className = '' }) => {
  const resolvedColor = color || getColor(skill);

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full px-3 py-1 text-xs font-medium
        ${colorMap[resolvedColor] || colorMap.blue}
        ${className}
      `}
    >
      {skill}
    </span>
  );
};

export default SkillBadge;
