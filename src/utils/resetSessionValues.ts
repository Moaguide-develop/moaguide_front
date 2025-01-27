export const resetSessionValues = () => {
    if (typeof window !== 'undefined' && typeof performance !== 'undefined') {
      const entries = performance.getEntriesByType('navigation');
      if (
        Array.isArray(entries) &&
        entries.length > 0 &&
        'type' in entries[0] &&
        (entries[0] as PerformanceNavigationTiming).type === 'reload'
      ) {
        sessionStorage.removeItem('selectedType');
        sessionStorage.removeItem('selectedCategory');
        sessionStorage.removeItem('page');
      }
    }
  };
  