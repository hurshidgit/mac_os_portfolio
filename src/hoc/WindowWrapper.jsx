import useWindowStore from '@store/window'
import { useLayoutEffect, useRef } from 'react'

const WindowWrapper = (Component, windowKey) => {
	const Wrapped = props => {
		const { windows, focusWindow } = useWindowStore()
		const { isOpen, zIndex } = windows[windowKey]
		const ref = useRef(null)

		// 🟡 Draggable va focus
		useLayoutEffect(() => {
			const el = ref.current
			if (!el) return

			const gsap = window.gsap
			const Draggable = window.Draggable

			if (!gsap || !Draggable) {
				console.warn('GSAP yoki Draggable topilmadi')
				return
			}

			gsap.registerPlugin(Draggable)

			// faqat headerdan ushlab sudrash uchun: handle: '#window-header'
			const draggableInstance = Draggable.create(el, {
				handle: '#window-header',
				onPress: () => focusWindow(windowKey),
			})[0]

			return () => {
				if (draggableInstance) draggableInstance.kill()
			}
		}, [focusWindow, windowKey])

		// 🔵 Oyna ochilib/yopilganda animatsiya
		useLayoutEffect(() => {
			const el = ref.current
			if (!el) return

			const gsap = window.gsap
			if (!gsap) return

			if (isOpen) {
				el.style.display = 'block'

				gsap.fromTo(
					el,
					{ opacity: 0, scale: 0.9 },
					{ opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }
				)
			} else {
				gsap.to(el, {
					opacity: 0,
					scale: 0.9,
					duration: 0.2,
					ease: 'power2.in',
					onComplete() {
						el.style.display = 'none'
					},
				})
			}
		}, [isOpen])

		return (
			<section id={windowKey} ref={ref} style={{ zIndex }} className='absolute'>
				<Component {...props} />
			</section>
		)
	}

	Wrapped.displayName = `WindowWrapper(${
		Component.displayName || Component.name || 'Component'
	})`

	return Wrapped
}

export default WindowWrapper
