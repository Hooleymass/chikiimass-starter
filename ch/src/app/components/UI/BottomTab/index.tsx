"use client";
import { Home, Settings, Tv } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomTab = () => {
  const pathname = usePathname();

  return (
    <div className="">
      <div className="btm-nav tabs-boxed fixed bottom-0 w-full bg-primary border-t border-gray-200 sm:hidden xl:hidden lg:hidden">
        <Link href="/" passHref>
          <div
            className={`tab flex-1 text-center ${
              pathname === "/" ? "tab-active" : ""
            }`}
          >
            <Home />
          </div>
        </Link>
        <Link href="/tv" passHref>
          <div
            className={`tab flex-1 text-center ${
              pathname === "/tv" ? "tab-active" : ""
            }`}
          >
            <Tv />
          </div>
        </Link>
        <Link href="/settings" passHref>
          <div
            className={`tab flex-1 text-center ${
              pathname === "/settings" ? "tab-active" : ""
            }`}
          >
            <Settings />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BottomTab;