export default function SearchLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-bg w-full">
      <div className="min-h-[calc(100dvh-134.5px)] sm:min-h-[calc(100vh-59px)] max-w-[600px] w-full mx-auto">{children}</div>
    </div>
  );
}
