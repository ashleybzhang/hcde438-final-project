import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db, auth } from '../firebase/config'

export default function StyleDetail() {
  const { id } = useParams()
  const [style, setStyle] = useState(null)
  const [saved, setSaved] = useState(false)
  const user = auth.currentUser

  useEffect(() => {
    getDoc(doc(db, 'styles', id)).then(d => {
      if (d.exists()) setStyle({ id: d.id, ...d.data() })
    })

    if (user) {
      getDoc(doc(db, 'users', user.uid)).then(d => {
        if (d.exists() && d.data().savedStyles?.includes(id)) {
          setSaved(true)
        }
      })
    }
  }, [id, user])

  const toggleSave = async () => {
    if (!user) {
      alert('Please log in to save styles!')
      return
    }
    const userRef = doc(db, 'users', user.uid)
    if (saved) {
      await setDoc(userRef, { savedStyles: arrayRemove(id) }, { merge: true })
      setSaved(false)
    } else {
      await setDoc(userRef, { savedStyles: arrayUnion(id) }, { merge: true })
      setSaved(true)
    }
  }

  if (!style) return <p className="p-8">Loading...</p>

  return (
    <div className="px-8 py-10 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-4xl font-bold">{style.name}</h1>
        <button
          onClick={toggleSave}
          className={`px-4 py-2 rounded-lg border transition text-sm font-medium ${
            saved
              ? 'bg-stone-900 text-white border-stone-900'
              : 'bg-white text-stone-900 border-stone-300 hover:bg-stone-100'
          }`}
        >
          {saved ? '✓ Saved' : '+ Save Style'}
        </button>
      </div>
      <p className="text-stone-600 mb-6">{style.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {style.tags?.map(tag => (
          <span key={tag} className="text-sm bg-stone-100 px-3 py-1 rounded-full">{tag}</span>
        ))}
      </div>
      <h3 className="text-xl font-semibold mb-3">Associated Brands</h3>
      <ul className="list-disc list-inside text-stone-700">
        {style.brands?.map(b => <li key={b}>{b}</li>)}
      </ul>
    </div>
  )
}