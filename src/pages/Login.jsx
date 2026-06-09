import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isNew, setIsNew] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      if (isNew) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      navigate('/profile')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 px-6">
      <h2 className="text-3xl font-bold mb-6">{isNew ? 'Sign Up' : 'Login'}</h2>
      <input value={email} onChange={e => setEmail(e.target.value)}
        placeholder="Email" className="w-full border rounded-lg px-4 py-2 mb-3" />
      <input value={password} onChange={e => setPassword(e.target.value)}
        type="password" placeholder="Password" className="w-full border rounded-lg px-4 py-2 mb-4" />
      <button onClick={handleSubmit}
        className="w-full bg-stone-900 text-white py-3 rounded-lg hover:bg-stone-700 transition mb-3">
        {isNew ? 'Create Account' : 'Sign In'}
      </button>
      <p className="text-center text-sm text-stone-500 cursor-pointer hover:underline"
        onClick={() => setIsNew(!isNew)}>
        {isNew ? 'Already have an account? Login' : "Don't have an account? Sign up"}
      </p>
    </div>
  )
}