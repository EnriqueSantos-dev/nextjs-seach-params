"use client";

import { useRouter } from "next/navigation";

export function ButtonReset() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className="rounded-md px-2 h-10 text-white flex items-center bg-red-500 hover:bg-red-600 transition-colors w-fit"
    >
      Reset Search
    </button>
  );
}
