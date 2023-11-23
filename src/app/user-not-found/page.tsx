import Link from "next/link";

export default function UserNotFoundPage() {
  return (
    <div>
      User Not Found
      <Link href="/" className="underline ml-4">
        Go Home
      </Link>
    </div>
  );
}
