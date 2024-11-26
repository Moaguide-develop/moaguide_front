export const Line = ({ mt, mb }: { mt?: number; mb?: number }) => {
  return (
    <div
      className={`mt-[${mt}px] mb-[${mb}px]  w-atuo h-[1px] border border-[#eceef2]`}
    />
  );
};
