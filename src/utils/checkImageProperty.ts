import defaultImage from '../../public/images/learning/learning_img.svg';

export const getValidImageSrc = (imgLink: string | null) => {
    if (!imgLink || imgLink === '테스트') {
      return defaultImage; 
    }
    if (imgLink.startsWith('http://') || imgLink.startsWith('https://')) {
      return imgLink;
    }
    return defaultImage;
  };