export const convertContentType = (type: string): string => {
    switch (type) {
      case 'article':
        return '아티클';
      case 'video':
        return '영상';
      default:
        return type;
    }
  };