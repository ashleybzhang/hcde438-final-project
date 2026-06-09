import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import Card from '../components/Card'

export default function Brands() {
  const [brands, setBrands] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getDocs(collection(db, 'brands')).then(snapshot => {
      setBrands(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
  }, [])

  const filtered = brands.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.styles?.some(s => s.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="px-8 py-10 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Brands</h2>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search brands or styles..."
        className="w-full border border-stone-300 rounded-lg px-4 py-2 mb-8 focus:outline-none focus:ring-2 focus:ring-stone-400"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(brand => (
          <Card
            key={brand.id}
            title={brand.name}
            description={brand.description}
            tags={brand.styles}
            linkTo={`/brands/${brand.id}`}
          />
        ))}
      </div>
    </div>
  )
}