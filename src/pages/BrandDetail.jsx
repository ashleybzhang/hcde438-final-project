import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db, auth } from '../firebase/config'

export default function BrandDetail() {
  const { id } = useParams()
  const [brand, setBrand] = useState(null)
  const [saved, setSaved] = useState(false)
  const user = auth.currentUser

  useEffect(() => {
    getDoc(doc(db, 'brands', id)).then(d => {
      if (d.exists()) setBrand({ id: d.id, ...d.data() })
    })

    if (user) {
      getDoc(doc(db, 'users', user.uid)).then(d => {
        if (d.exists() && d.data().savedBrands?.includes(id)) {
          setSaved(true)
        }
      })
    }
  }, [id, user])

  const toggleSave = async () => {
    if (!user) {
      alert('Please log in to save brands!')
      return
    }
    const userRef = doc(db, 'users', user.uid)
    if (saved) {
      await setDoc(userRef, { savedBrands: arrayRemove(id) }, { merge: true })
      setSaved(false)
    } else {
      await setDoc(userRef, { savedBrands: arrayUnion(id) }, { merge: true })
      setSaved(true)
    }
  }

  if (!brand) return <p className="p-8">Loading...</p>

  return (
    <div className="px-8 py-10 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-4xl font-bold">{brand.name}</h1>
        <button
          onClick={toggleSave}
          className={`px-4 py-2 rounded-lg border transition text-sm font-medium ${
            saved
              ? 'bg-stone-900 text-white border-stone-900'
              : 'bg-white text-stone-900 border-stone-300 hover:bg-stone-100'
          }`}
        >
          {saved ? '✓ Saved' : '+ Save Brand'}
        </button>
      </div>
      <p className="text-stone-500 mb-1">Price Range: {brand.priceRange}</p>
      <p className="text-stone-600 mb-6">{brand.description}</p>
      <h3 className="text-xl font-semibold mb-3">Associated Styles</h3>
      <div className="flex flex-wrap gap-2">
        {brand.styles?.map(s => (
          <span key={s} className="text-sm bg-stone-100 px-3 py-1 rounded-full">{s}</span>
        ))}
      </div>
    </div>
  )
}