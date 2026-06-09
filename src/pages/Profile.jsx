import { useEffect, useState } from 'react'
import { auth, db } from '../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [savedStyles, setSavedStyles] = useState([])
  const [savedBrands, setSavedBrands] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) {
        const userDoc = await getDoc(doc(db, 'users', u.uid))
        if (userDoc.exists()) {
          const data = userDoc.data()

          // Fetch saved styles
          const stylePromises = (data.savedStyles || []).map(id =>
            getDoc(doc(db, 'styles', id)).then(d => ({ id: d.id, ...d.data() }))
          )
          setSavedStyles(await Promise.all(stylePromises))

          // Fetch saved brands
          const brandPromises = (data.savedBrands || []).map(id =>
            getDoc(doc(db, 'brands', id)).then(d => ({ id: d.id, ...d.data() }))
          )
          setSavedBrands(await Promise.all(brandPromises))
        }
      }
    })
  }, [])

  if (!user) return (
    <div className="p-8 text-center">
      <p>You're not logged in.</p>
      <button onClick={() => navigate('/login')} className="mt-4 underline">Go to Login</button>
    </div>
  )

  return (
    <div className="px-8 py-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-1">Your Profile</h2>
      <p className="text-stone-500 mb-8">{user.email}</p>

      <h3 className="text-xl font-semibold mb-4">Saved Styles</h3>
      {savedStyles.length === 0 ? (
        <p className="text-stone-400 mb-8">No saved styles yet. <Link to="/styles" className="underline">Browse styles</Link></p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {savedStyles.map(style => (
            <Link key={style.id} to={`/styles/${style.id}`}
              className="border border-stone-200 rounded-xl p-4 hover:shadow-md transition bg-white">
              <h4 className="font-semibold">{style.name}</h4>
              <p className="text-stone-500 text-sm line-clamp-2">{style.description}</p>
            </Link>
          ))}
        </div>
      )}

      <h3 className="text-xl font-semibold mb-4">Saved Brands</h3>
      {savedBrands.length === 0 ? (
        <p className="text-stone-400 mb-8">No saved brands yet. <Link to="/brands" className="underline">Browse brands</Link></p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {savedBrands.map(brand => (
            <Link key={brand.id} to={`/brands/${brand.id}`}
              className="border border-stone-200 rounded-xl p-4 hover:shadow-md transition bg-white">
              <h4 className="font-semibold">{brand.name}</h4>
              <p className="text-stone-500 text-sm">{brand.priceRange}</p>
            </Link>
          ))}
        </div>
      )}

      <button onClick={() => signOut(auth).then(() => navigate('/'))}
        className="border border-stone-300 px-5 py-2 rounded-lg hover:bg-stone-100 transition">
        Sign Out
      </button>
    </div>
  )
}