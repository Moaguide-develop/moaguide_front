// kakaoMap.tsx

import React, { useEffect } from 'react';

const KakaoMap = ({ props }) => {
  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        // id가 'map'인 요소에 지도를 생성
        const mapContainer = document.getElementById('map');
        const mapOption = {
          // 해당 좌표는 서울 시청을 중심으로 함
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          // 줌 레벨 3으로 설정
          level: 3
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);
      });
    }
  }, []);

  return (
    // id가 'map'인 div 출력, width와 heigth를 설정해줘야 정상 출력됨
    <div id="map" />
  );
};

export default KakaoMap;
