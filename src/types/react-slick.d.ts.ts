declare module 'react-slick' {
    import * as React from 'react';
  
    interface SliderProps {
      dots?: boolean;
      infinite?: boolean;
      speed?: number;
      slidesToShow?: number;
      slidesToScroll?: number;
      arrows?: boolean;
      autoplay?: boolean;
      autoplaySpeed?: number;
      pauseOnHover?: boolean;
      responsive?: Array<{
        breakpoint: number;
        settings: {
          slidesToShow: number;
          slidesToScroll: number;
          infinite?: boolean;
          dots?: boolean;
        };
      }>;
    }
  
    class Slider extends React.Component<SliderProps> {}
  
    export default Slider;
  }