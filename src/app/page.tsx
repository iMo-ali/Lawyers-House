import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
      <Link href="/UserAccount" className="flex flex-col items-center justify-between p-10 bg-red-800 border-8">User accounts</Link> /* This is used as a PLACEHOLDER to navigate the page */
  );
}
