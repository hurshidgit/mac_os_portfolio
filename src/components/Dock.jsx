import { useEffect, useRef } from 'react'
import { Tooltip } from 'react-tooltip'
import { dockApps } from './constants'

const Dock = () => {
	const dockRef = useRef(null)

	const toggleApp = app => {
		// To do implement app opening logic
	}

	useEffect(() => {
		const dock = dockRef.current
		if (!dock) return

		// script orqali ulaganing uchun: gsap global
		const gsap = window.gsap
		if (!gsap) {
			console.warn('GSAP topilmadi. Script to‘g‘ri ulanganini tekshir.')
			return
		}

		const icons = dock.querySelectorAll('.dock-icon')

		const animateIcons = mouseX => {
			const { left: dockLeft } = dock.getBoundingClientRect()

			icons.forEach(icon => {
				const { left: iconLeft, width: iconWidth } =
					icon.getBoundingClientRect()

				const center = iconLeft - dockLeft + iconWidth / 2
				const distance = Math.abs(mouseX - center)
				const intensity = Math.exp(-(distance ** 2) / 20000)

				gsap.to(icon, {
					scale: 1 + 0.15 * intensity,
					y: -15 * intensity,
					duration: 0.3,
					ease: 'power1.out',
				})
			})
		}

		const handleMouseMove = e => {
			const { left: dockLeft } = dock.getBoundingClientRect()
			const mouseX = e.clientX - dockLeft
			animateIcons(mouseX)
		}

		const resetIcons = () => {
			icons.forEach(icon => {
				gsap.to(icon, {
					scale: 1,
					y: 0,
					duration: 0.3,
					ease: 'power1.out',
				})
			})
		}

		dock.addEventListener('mousemove', handleMouseMove)
		dock.addEventListener('mouseleave', resetIcons)

		return () => {
			dock.removeEventListener('mousemove', handleMouseMove)
			dock.removeEventListener('mouseleave', resetIcons)
		}
	}, [])

	return (
		<section id='dock'>
			<div ref={dockRef} className='dock-container'>
				{dockApps.map(({ id, icon, name, canOpen }) => (
					<div key={id} className='relative flex justify-center'>
						<button
							type='button'
							className='dock-icon'
							aria-label={name}
							data-tooltip-id='dock-tooltip'
							data-tooltip-content={name}
							disabled={!canOpen}
							onClick={() => toggleApp({ id, canOpen })}
						>
							<img
								src={`/public/images/${icon}`}
								alt={`${name} icon`}
								loading='lazy'
								className={canOpen ? '' : 'opacity-60'}
							/>
						</button>
					</div>
				))}

				<Tooltip id='dock-tooltip' place='top' className='tooltip' />
			</div>
		</section>
	)
}

export default Dock
