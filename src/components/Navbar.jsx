import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-stone-200 bg-white">
      <Link to="/" className="text-2xl font-bold tracking-widest">TIFA</Link>
      <div className="flex gap-6 text-sm">
        <Link to="/styles" className="hover:underline">Styles</Link>
        <Link to="/brands" className="hover:underline">Brands</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
      </div>
    </nav>
  )
}