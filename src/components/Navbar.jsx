import useWindowStore from '@store/window'
import dayjs from 'dayjs'
import { navIcons, navLinks } from '../constants'

const Navbar = () => {
	const { openWindow } = useWindowStore()
	return (
		<nav>
			<div>
				<img src='/images/logo.svg' alt='Logo' className='cursor-pointer' />
				<p className='font-bold'>Hurshid's Portfolio</p>

				<ul>
					{navLinks.map(({ id, name, type }) => (
						<li
							key={id}
							onClick={() => openWindow(type)}
							className='mx-4 cursor-pointer'
						>
							{name}
						</li>
					))}
				</ul>
			</div>
			<div>
				<ul>
					{navIcons.map(({ id, img }) => (
						<li key={id} className=' cursor-pointer'>
							<img src={img} alt={`icon-${id}`} className='icon-hover' />
						</li>
					))}
				</ul>

				<time>{dayjs().format('ddd MMM D h:mm A')}</time>
			</div>
		</nav>
	)
}

export default Navbar
