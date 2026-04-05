"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "./UserSidebar";

export function ResponsiveSidebar() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Set initial value based on current window size
    const checkScreen = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    checkScreen();

    // Listen for resize events
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Don't render on server or small screens
  if (!isLargeScreen) return null;

  return (
    <div className="sidebar-wrapper">
      <Sidebar />
    </div>
  );
}
