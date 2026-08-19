'use client'

export default function FilterTabs({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              isActive
                ? 'bg-green text-parchment dark:bg-green-bright dark:text-forest-deep shadow-md font-semibold'
                : 'bg-parchment-light dark:bg-forest-surface text-forest/70 dark:text-parchment/70 hover:text-forest dark:hover:text-parchment hover:bg-sand/40 dark:hover:bg-forest-light border border-sand/40 dark:border-forest-light'
            }`}
          >
            {cat.label}
            {typeof cat.count === 'number' && (
              <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                isActive ? 'bg-parchment/20 text-parchment dark:text-forest' : 'bg-sand/40 dark:bg-forest-light text-forest/80 dark:text-parchment/80'
              }`}>
                {cat.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
