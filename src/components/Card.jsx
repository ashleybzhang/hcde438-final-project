import { Link } from 'react-router-dom'

export default function Card({ title, description, tags, linkTo }) {
  return (
    <Link to={linkTo} className="block border border-stone-200 rounded-xl p-5 hover:shadow-md transition bg-white">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-stone-500 text-sm mb-3 line-clamp-2">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags?.map(tag => (
          <span key={tag} className="text-xs bg-stone-100 px-2 py-1 rounded-full">{tag}</span>
        ))}
      </div>
    </Link>
  )
}