import { Header } from "./Header";

export function Layout({children} : {children: React.ReactNode}) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="p-6">{children}</main>
    </div>
  );
}