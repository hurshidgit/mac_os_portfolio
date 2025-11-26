import { locations } from '@constants/index'
import useLocationStore from '@store/location'
import useWindowStore from '@store/window'
import clsx from 'clsx'
import { useEffect } from 'react'

const projects = locations.work?.children ?? []

const Home = () => {
	const { setActiveLocation } = useLocationStore()
	const { openWindow } = useWindowStore()
	const handleOpenProjectFinder = project => {
		setActiveLocation(project)
		openWindow('finder')
	}
	useEffect(() => {
		// gsap va Draggable globaldan keladi (CDN orqali)
		if (window.Draggable) {
			window.Draggable.create('.folder')
		} else {
			console.warn('Draggable not found on window')
		}
	}, [])

	return (
		<section id='home'>
			<ul>
				{projects.map(project => (
					<li
						key={project.id}
						className={clsx('group folder', project.windowPosition)}
						onClick={() => handleOpenProjectFinder(project)}
					>
						<img src='/images/folder.png' alt={project.name} />
						<p>{project.name}</p>
					</li>
				))}
			</ul>
		</section>
	)
}

export default Home
