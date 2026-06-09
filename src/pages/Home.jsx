import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="px-8 py-16 max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-bold mb-4 tracking-tight">Discover Your Style</h1>
      <p className="text-stone-500 text-lg mb-10">
        Explore fashion aesthetics, find brands that match your vibe, and build your wardrobe identity.
      </p>
      <div className="flex gap-4 justify-center">
        <Link to="/styles" className="bg-stone-900 text-white px-6 py-3 rounded-lg hover:bg-stone-700 transition">
          Browse Styles
        </Link>
        <Link to="/brands" className="border border-stone-300 px-6 py-3 rounded-lg hover:bg-stone-100 transition">
          Browse Brands
        </Link>
      </div>
    </div>
  )
}