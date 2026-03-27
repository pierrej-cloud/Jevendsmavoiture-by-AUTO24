"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A24</span>
          </div>
          <span className="font-bold text-neutral-dark text-sm">
            Jevendsmavoiture
          </span>
        </Link>
      </div>
    </header>
  );
}
