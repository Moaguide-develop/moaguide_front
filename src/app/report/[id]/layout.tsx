export default function ReportLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="max-w-[600px] w-full mx-auto">{children}</div>;
}
