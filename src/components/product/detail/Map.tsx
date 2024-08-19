// kakaoMap.tsx

import React, { useEffect, useRef } from 'react';

/* eslint-disable @typescript-eslint/no-unused-vars */

declare global {
  interface Window {
    kakao: any;
  }
}
const KakaoMap = ({ props }: any) => {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.kakao) {
      console.log('KakaoMap is loaded');
      window.kakao.maps.load(() => {
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3
        };
        const map = new window.kakao.maps.Map(mapRef.current, mapOption);

        // 마커를 생성하고 지도에 표시
        const markerPosition = new window.kakao.maps.LatLng(37.566826, 126.9786567);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(map);

        // 지도가 확대 또는 축소될 때 마커의 위치를 중심으로 설정
        window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
          map.setCenter(markerPosition);
        });

        // 폴리곤을 그릴 좌표 배열
        const polygonPath = [
          new window.kakao.maps.LatLng(37.566826, 126.9786567),
          new window.kakao.maps.LatLng(37.565826, 126.9786567),
          new window.kakao.maps.LatLng(37.565826, 126.9796567),
          new window.kakao.maps.LatLng(37.566826, 126.9796567)
        ];

        // 폴리곤을 생성하고 지도에 표시
        const polygon = new window.kakao.maps.Polygon({
          path: polygonPath,
          strokeWeight: 3,
          strokeColor: 'green',
          strokeOpacity: 0.8,
          fillOpacity: 0
        });
        polygon.setMap(map);
      });
    }
  }, []);

  return <div ref={mapRef} className="w-[400px] h-[300px]   rounded-md" />;
};

export default KakaoMap;
