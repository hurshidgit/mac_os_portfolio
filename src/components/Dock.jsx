import { useRef } from 'react'
import { Tooltip } from 'react-tooltip'
import { dockApps } from './constants'

const Dock = () => {
	const dockRef = useRef(null)

	const toggleApp = ({ id, canOpen }) => {
		if (!canOpen) return
		console.log('Open app:', id)
	}

	return (
		<section id='dock'>
			<div ref={dockRef} className='dock-container'>
				{dockApps.map(({ id, icon, name, canOpen }) => (
					<div key={id} className='relative flex justify-center'>
						<button
							type='button'
							className='dock-icon'
							aria-label={name}
							// MUHIM: hammasi 'dock-tooltip' bo'lsin
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

				{/* id shu yerda ham xuddi shunday bo'lishi kerak */}
				<Tooltip id='dock-tooltip' place='top' className='tooltip' />
			</div>
		</section>
	)
}

export default Dock
