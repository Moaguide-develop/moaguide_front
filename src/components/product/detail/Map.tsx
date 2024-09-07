import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

declare global {
  interface Window {
    kakao: any;
  }
}

const fetchBuildingData = async () => {
  const response = await axios.get(
    'https://api.moaguide.com/detail/building/area/sou.10'
  );
  return response.data;
};

const KakaoMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['buildingData'],
    queryFn: fetchBuildingData
  });
  console.log(data);
  useEffect(() => {
    if (window.kakao && data) {
      window.kakao.maps.load(() => {
        const mapOption = {
          center: new window.kakao.maps.LatLng(data.latitude, data.longitude),
          level: 6
        };
        const map = new window.kakao.maps.Map(mapRef.current, mapOption);

        const markerPosition = new window.kakao.maps.LatLng(
          data.latitude,
          data.longitude
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(map);

        const circle = new window.kakao.maps.Circle({
          center: markerPosition,
          radius: 400,
          strokeWeight: 2,
          strokeColor: '#ff0000',
          strokeOpacity: 0.8,
          strokeStyle: 'solid',
          fillColor: '#ff0000',
          fillOpacity: 0.4
        });
        circle.setMap(map);
        circle.setZIndex(10);
        window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
          map.setCenter(markerPosition);
        });

        // API에서 가져온 데이터를 사용해 폴리곤을 그리기
        data.areas.forEach((area: any) => {
          const coordinates = area.polygon
            .replace('POLYGON ((', '')
            .replace('))', '')
            .split(', ')
            .map((coord: string) => {
              const [lng, lat] = coord.split(' ').map(Number);
              return new window.kakao.maps.LatLng(lat, lng);
            });

          const polygon = new window.kakao.maps.Polygon({
            path: coordinates,
            strokeWeight: 3,
            strokeColor: area.color.toLowerCase(),
            strokeOpacity: 0.8,
            fillOpacity: 0.5,
            fillColor: area.color.toLowerCase()
          });
          polygon.setMap(map);
        });
      });
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return <div ref={mapRef} style={{ width: '400px', height: '300px' }} />;
};

export default KakaoMap;
