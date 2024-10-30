import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { basicAxiosInstance } from '@/service/axiosInstance';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop(); // 경로의 마지막 부분 추출
  const fetchBuildingData = async () => {
    const response = await basicAxiosInstance.get(`/detail/building/area/${lastSegment}`);
    return response.data;
  };
  const mapRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['buildingData', lastSegment],
    queryFn: fetchBuildingData
  });

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

        // 지도의 중심을 고정
        window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
          map.setCenter(markerPosition);
        });

        // API에서 가져온 데이터를 사용해 폴리곤을 그리기
        data?.areas?.forEach((area: any) => {
          if (area.polygon.startsWith('HOLE')) {
            // HOLE 처리
            const polygons = area.polygon
              .replace('HOLE ((', '')
              .replace('))', '')
              .split('),(')
              .map((polygon: string) => {
                return polygon
                  .replace('(', '')
                  .replace(')', '')
                  .split(', ')
                  .map((coord: string) => {
                    const [lng, lat] = coord.split(' ').map(Number);
                    return new window.kakao.maps.LatLng(lat, lng);
                  });
              });

            const outerPolygon = polygons[0];
            const innerPolygons = polygons.slice(1);

            const polygon = new window.kakao.maps.Polygon({
              path: [outerPolygon, ...innerPolygons],
              strokeWeight: 3,
              strokeColor: area.color.toLowerCase(),
              strokeOpacity: 0.8,
              fillOpacity: 0.5,
              fillColor: area.color.toLowerCase()
            });
            polygon.setMap(map);
          } else if (area.polygon.startsWith('POLYGON')) {
            // 일반 POLYGON 처리
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
          }
        });
      });
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div>
      <div className="mb-[20px]  flex items-center">
        <div className=" text-2xl font-bold ">위치</div>
        <div className=" ml-[15px] text-base  ">{data?.location}</div>
      </div>

      <div
        ref={mapRef}
        className=" desk:w-[340px] desk:h-[280px]  desk2:w-[400px] desk2:h-[350px]"
      />
    </div>
  );
};

export default KakaoMap;
