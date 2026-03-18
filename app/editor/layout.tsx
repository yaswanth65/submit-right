// app/editor/layout.tsx
import { EditorSidebar } from "./components/EditorSidebar";
import { EditorTopbar } from "./components/EditorTopbar";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <EditorSidebar />
      <div className="flex-1 ml-[260px] flex flex-col min-h-screen">
        <EditorTopbar />
        <main className="p-8 pb-12 flex-1 w-full bg-[#FAFAFA] md:bg-[#FFFFFF]">
          {children}
        </main>
      </div>
    </>
  );
}
