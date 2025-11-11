import { Outlet } from "react-router-dom";


export default function MainLayout() {
  return (
    <div className="w-screen h-screen flex flex-col bg-gray-50">
      <main className="flex-1 px-8 overflow-auto py-6">
        <Outlet />
      </main>
    </div>
  );  
}
