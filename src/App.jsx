import { Navbar, Welcome } from '@components'
import Dock from '@components/Dock'
import Terminal from '@windows/Terminal'
import { useEffect } from 'react'

const App = () => {
	useEffect(() => {
		// GSAP script orqali global bo‘ladi
		const gsap = window.gsap
		if (!gsap) return

		// Draggable plugin mavjud bo‘lsa ro‘yxatga qo‘shish
		if (window.Draggable) gsap.registerPlugin(window.Draggable)
	}, [])

	return (
		<main>
			<Navbar />
			<Welcome />
			<Dock />

			<Terminal />
		</main>
	)
}

export default App
