import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-600 p-4 text-white">
      <div className="container flex justify-between items-center px-[4%]">
        <p className="text-2xl font-extrabold">Workout Buddy</p>
        <ul className="flex space-x-4 font-semibold">
          <li>
            <Link href="/" id="link">
              Home
            </Link>
          </li>
          <li>
            <Link href="/workouts" id="link">
              Workouts
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
