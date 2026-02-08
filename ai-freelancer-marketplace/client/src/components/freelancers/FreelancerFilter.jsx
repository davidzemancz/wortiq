import { Search, SlidersHorizontal, X } from 'lucide-react';
import { skillCategories } from '../../data/skills';

const categories = ['Vše', ...skillCategories.map((c) => c.name)];

const sortOptions = [
  { value: 'rating', label: 'Nejvyšší rating' },
  { value: 'price-low', label: 'Nejnižší cena' },
  { value: 'price-high', label: 'Nejvyšší cena' },
  { value: 'projects', label: 'Nejvíce projektů' },
];

const FreelancerFilter = ({ filters, onFilterChange }) => {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const activeFiltersCount = [
    filters.search,
    filters.category !== 'Vše' && filters.category,
    filters.minRate > 200,
    filters.maxRate < 2000,
    filters.minRating > 3.0,
    filters.availableOnly,
  ].filter(Boolean).length;

  const resetFilters = () => {
    onFilterChange({
      search: '',
      category: 'Vše',
      minRate: 200,
      maxRate: 2000,
      minRating: 3.0,
      availableOnly: false,
      sort: 'rating',
    });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-slate-700">
          <SlidersHorizontal className="h-5 w-5" />
          <h3 className="font-medium">Filtry</h3>
          {activeFiltersCount > 0 && (
            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-600 text-white text-xs font-medium">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            Resetovat
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Hledat jméno nebo dovednost..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          aria-label="Hledat freelancery"
          className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm
            placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20
            focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Category chips */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-600 mb-2">
          Kategorie
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleChange('category', cat)}
              className={`
                px-3 py-2.5 min-h-[44px] rounded-full text-xs font-medium transition-all
                ${
                  filters.category === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-600 mb-2">
          Hodinová sazba: {filters.minRate} – {filters.maxRate} Kč/h
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={200}
            max={2000}
            step={50}
            value={filters.minRate}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val <= filters.maxRate) handleChange('minRate', val);
            }}
            className="w-full accent-blue-600"
          />
          <input
            type="range"
            min={200}
            max={2000}
            step={50}
            value={filters.maxRate}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= filters.minRate) handleChange('maxRate', val);
            }}
            className="w-full accent-blue-600"
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>200 Kč</span>
          <span>2 000 Kč</span>
        </div>
      </div>

      {/* Min rating */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-600 mb-2">
          Minimální hodnocení: {filters.minRating.toFixed(1)}
        </label>
        <input
          type="range"
          min={3.0}
          max={5.0}
          step={0.1}
          value={filters.minRating}
          onChange={(e) => handleChange('minRating', Number(e.target.value))}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>3.0</span>
          <span>5.0</span>
        </div>
      </div>

      {/* Available only */}
      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.availableOnly}
            onChange={(e) => handleChange('availableOnly', e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
          />
          <span className="text-sm text-slate-700">Pouze volní</span>
        </label>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">
          Seřadit podle
        </label>
        <select
          value={filters.sort}
          onChange={(e) => handleChange('sort', e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm
            text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20
            focus:border-blue-500 transition-colors bg-white"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FreelancerFilter;
