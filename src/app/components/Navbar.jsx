import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800">
      <h1>Logo</h1>
      <Link href={"/"}> Dashboard </Link>
      <Link href={"/UserAccount"}> User </Link>
    </nav>
  );
}
