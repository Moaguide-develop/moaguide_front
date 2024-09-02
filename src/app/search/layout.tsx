export default function SearchLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-bg w-full">
      <div className=" max-w-[600px] h-full min-h-screen w-full mx-auto">{children}</div>
    </div>
  );
}
