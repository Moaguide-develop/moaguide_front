export const resetSessionValues = () => {
  sessionStorage.removeItem('selectedType');
  sessionStorage.removeItem('selectedCategory');
  sessionStorage.removeItem('page');
};