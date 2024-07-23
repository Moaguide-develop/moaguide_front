export default function Home() {
  return (
    <div>
      <div>
        <div className="text-heading1 text-gray700">Heading 1: Hello 월드</div>
        <div className="text-heading2 text-gray600">Heading 2: Hello 월드</div>
        <div className="text-heading3 text-gray500">Heading 3: Hello 월드</div>
        <div className="text-heading4 text-gray400">Heading 4: Hello 월드</div>
        <div className="text-title1 text-gray300">Title 1: Hello 월드</div>
        <div className="text-title2 text-gray200">Title 2: Hello 월드</div>
        <div className="text-body1 text-gray100">Body 1: Hello 월드</div>
        <div className="text-body2 text-gray50">Body 2: Hello 월드</div>
        <div className="text-body3 text-black">Body 3: Hello 월드</div>
        <div className="text-body4 text-white bg-black">Body 4: Hello 월드</div>
        <div className="text-body5 text-error">Body 5: Hello 월드</div>
        <div className="text-mobileTitle text-success">
          Mobile Title: Hello 월드
        </div>
        <div className="text-body6 text-gray700">Body 6: Hello 월드</div>
        <div className="text-body7 text-gray600">Body 7: Hello 월드</div>
        <div className="text-body8 text-gray500">Body 8: Hello 월드</div>
        <div className="text-caption1 text-gray400">Caption 1: Hello 월드</div>
        <div className="text-caption2 text-gray300">Caption 2: Hello 월드</div>
        <div className="text-caption3 text-gray200">Caption 3: Hello 월드</div>
        <div className="text-caption4 text-gray100">Caption 4: Hello 월드</div>
      </div>
      <div>
        <div className="h-32 w-full bg-gradient1 flex items-center justify-center text-white font-bold">
          Gradient 1 Background
        </div>
        <div className="h-32 w-full bg-gradient2 flex items-center justify-center text-white font-bold">
          Gradient 2 Background
        </div>
        <div className="h-32 w-full bg-gradient3 flex items-center justify-center text-white font-bold">
          Gradient 3 Background
        </div>
        <div className="h-32 w-full bg-gradient4 flex items-center justify-center text-white font-bold">
          Gradient 4 Background
        </div>
      </div>
      <div>
        <div className="text-heading1 text-gray700">
          Mobile Test
          {/* 개발 할 때 desk 속성을 추가하지 않으면 모바일 기준이라고 생각하기 */}
          <div className="text-body5 text-error desk:text-body5 desk:text-success">
            모바일일땐 빨간색
          </div>
        </div>
      </div>
    </div>
  );
}
