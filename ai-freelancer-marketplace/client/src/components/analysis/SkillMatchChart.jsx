import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200 px-4 py-3">
      <p className="text-sm font-semibold text-slate-900">{data.skill}</p>
      <p className="text-xs text-violet-600 font-medium">{data.score}% shoda</p>
    </div>
  );
}

export default function SkillMatchChart({ freelancer, taskSkills = [] }) {
  if (!freelancer || taskSkills.length === 0) return null;

  const freelancerSkills = (freelancer.skills || []).map((s) => s.toLowerCase());

  // Build radar data from task skills
  const radarData = taskSkills.map((skill) => {
    const hasSkill = freelancerSkills.some(
      (fs) => fs.includes(skill.toLowerCase()) || skill.toLowerCase().includes(fs)
    );
    return {
      skill,
      score: hasSkill ? 90 + Math.floor(Math.random() * 10) : 30 + Math.floor(Math.random() * 25),
      fullMark: 100,
    };
  });

  return (
    <div style={{ height: 200 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fontSize: 10, fill: '#64748b' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="Shoda"
            dataKey="score"
            stroke="#7C3AED"
            fill="#7C3AED"
            fillOpacity={0.2}
            strokeWidth={2}
            animationDuration={800}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
