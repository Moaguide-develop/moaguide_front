export default function PaymentLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="max-w-[640px] w-full mx-auto">{children}</div>;
}
