import { Navbar, Welcome } from '@components'
import Dock from '@components/Dock'
import Home from '@components/Home'
import Terminal from '@windows/Terminal'
import { useEffect } from 'react'
import {
	Contact,
	Finder,
	ImageFile,
	Photos,
	Resume,
	Safari,
	Text,
} from './windows'

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
			<Safari />
			<Resume />
			<ImageFile />
			<Text />
			<Finder />
			<Contact />
			<Home />
			<Photos />
		</main>
	)
}

export default App
