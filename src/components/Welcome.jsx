import { useEffect, useRef } from 'react'

const renderText = (text, className, baseWeight = 400) => {
	return [...text].map((char, i) => (
		<span key={i} className={className} style={{ fontWeight: baseWeight }}>
			{char === ' ' ? '\u00A0' : char}
		</span>
	))
}

const FONT_WEIGHTS = {
	title: { min: 400, max: 900, default: 400 },
	subtitle: { min: 100, max: 400, default: 400 },
}

const setupTextHover = (container, type) => {
	if (!container) return

	const letters = container.querySelectorAll('span')
	const { min, max, default: base } = FONT_WEIGHTS[type]

	const animateLetter = (letter, weight) => {
		letter.style.fontVariationSettings = `"wght" ${weight}`
	}

	const handleMouseMove = e => {
		const { left } = container.getBoundingClientRect()
		const mouseX = e.clientX - left

		letters.forEach(letter => {
			const { left: l, width: w } = letter.getBoundingClientRect()
			const distance = Math.abs(mouseX - (l - left + w / 2))
			const intensity = Math.exp(-(distance ** 2) / 2000)
			animateLetter(letter, min + (max - min) * intensity)
		})
	}

	const handleMouseLeave = () => {
		letters.forEach(letter => animateLetter(letter, base))
	}

	container.addEventListener('mousemove', handleMouseMove)
	container.addEventListener('mouseleave', handleMouseLeave)

	// cleanup
	return () => {
		container.removeEventListener('mousemove', handleMouseMove)
		container.removeEventListener('mouseleave', handleMouseLeave)
	}
}

const Welcome = () => {
	const titleRef = useRef(null)
	const subtitleRef = useRef(null)

	useEffect(() => {
		const cleanups = []
		cleanups.push(setupTextHover(titleRef.current, 'title'))
		cleanups.push(setupTextHover(subtitleRef.current, 'subtitle'))

		return () => cleanups.forEach(c => c && c())
	}, [])

	return (
		<section id='welcome'>
			<p ref={subtitleRef}>
				{renderText(
					"Hey, I'm Hurshid Welcome to my portfolio",
					'text-3xl font-georama',
					100
				)}
			</p>
			<h1 ref={titleRef} className='mt-7'>
				{renderText('portfolio', 'text-9xl italic font-georama')}
			</h1>
			<div className='small-screen'>
				<p>This Portfolio is designed for desktop/tablet screens only.</p>
			</div>
		</section>
	)
}

export default Welcome
