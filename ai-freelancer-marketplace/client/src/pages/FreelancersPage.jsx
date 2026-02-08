import { useState, useMemo, useCallback } from 'react';
import { Users } from 'lucide-react';
import FreelancerBrowser from '../components/freelancers/FreelancerBrowser';
import FreelancerFilter from '../components/freelancers/FreelancerFilter';
import FreelancerProfile from '../components/freelancers/FreelancerProfile';
import { freelancers } from '../data/freelancers';
import { skillCategories } from '../data/skills';
import useUIStore from '../stores/uiStore';

const defaultFilters = {
  search: '',
  category: 'Vše',
  minRate: 200,
  maxRate: 2000,
  minRating: 3.0,
  availableOnly: false,
  sort: 'rating',
};

// Build category→skills lookup from data
const categorySkillsLookup = Object.fromEntries(
  skillCategories.map((c) => [
    c.name,
    c.skills.map((s) => s.toLowerCase()),
  ]),
);

function matchesCategory(freelancer, category) {
  if (category === 'Vše') return true;
  const skills = categorySkillsLookup[category];
  if (!skills) return true;
  const freelancerSkills = freelancer.skills.map((s) => s.toLowerCase());
  const roleLower = freelancer.role.toLowerCase();
  return skills.some(
    (s) => freelancerSkills.some((fs) => fs.includes(s) || s.includes(fs)) ||
      roleLower.includes(s),
  );
}

function matchesSearch(freelancer, search) {
  if (!search) return true;
  const q = search.toLowerCase();
  return (
    freelancer.name.toLowerCase().includes(q) ||
    freelancer.role.toLowerCase().includes(q) ||
    freelancer.skills.some((s) => s.toLowerCase().includes(q))
  );
}

function sortFreelancers(list, sort) {
  const sorted = [...list];
  switch (sort) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'price-low':
      return sorted.sort((a, b) => a.hourlyRate - b.hourlyRate);
    case 'price-high':
      return sorted.sort((a, b) => b.hourlyRate - a.hourlyRate);
    case 'projects':
      return sorted.sort((a, b) => b.completedProjects - a.completedProjects);
    default:
      return sorted;
  }
}

const FreelancersPage = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const {
    isFreelancerModalOpen,
    selectedFreelancerId,
    openFreelancerModal,
    closeFreelancerModal,
  } = useUIStore();

  const filteredFreelancers = useMemo(() => {
    let result = freelancers.filter((f) => {
      if (!matchesSearch(f, filters.search)) return false;
      if (!matchesCategory(f, filters.category)) return false;
      if (f.hourlyRate < filters.minRate || f.hourlyRate > filters.maxRate)
        return false;
      if (f.rating < filters.minRating) return false;
      if (filters.availableOnly && f.availability !== 'available') return false;
      return true;
    });
    return sortFreelancers(result, filters.sort);
  }, [filters]);

  const selectedFreelancer = useMemo(
    () => freelancers.find((f) => f.id === selectedFreelancerId) || null,
    [selectedFreelancerId],
  );

  const handleOpenProfile = useCallback(
    (id) => openFreelancerModal(id),
    [openFreelancerModal],
  );

  const handleCloseProfile = useCallback(
    () => closeFreelancerModal(),
    [closeFreelancerModal],
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Freelanceři
              </h1>
              <p className="text-slate-600 mt-1">
                Najděte ty nejlepší odborníky pro váš projekt
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <FreelancerFilter
                filters={filters}
                onFilterChange={setFilters}
              />
            </div>
          </aside>

          {/* Grid */}
          <main className="flex-1 min-w-0">
            <FreelancerBrowser
              freelancers={filteredFreelancers}
              onOpenProfile={handleOpenProfile}
            />
          </main>
        </div>
      </div>

      {/* Profile modal */}
      <FreelancerProfile
        freelancer={selectedFreelancer}
        isOpen={isFreelancerModalOpen}
        onClose={handleCloseProfile}
      />
    </div>
  );
};

export default FreelancersPage;
