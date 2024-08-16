
export const formatBirthDate = (date: string): string => {

  
    if (date.length === 10) { 
      return date.replace(/\./g, '-'); // 1990-01-01
    }
    return '';
  };
  