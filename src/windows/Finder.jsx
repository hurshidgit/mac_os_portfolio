import WindowControlls from '@components/WindowControlls'
import { locations } from '@constants/index'
import WindowWrapper from '@hoc/WindowWrapper'
import useLocationStore from '@store/location'
import useWindowStore from '@store/window'
import clsx from 'clsx'
import { Search } from 'feather-icons-react'

const Finder = () => {
	const { openWindow } = useWindowStore()
	const openItem = item => {
		if (item.fileType === 'pdf') return openWindow('resume')
		if (item.kind === 'folder') return setActiveLocation(item)
		if (['fig', 'url'].includes(item.fileType) && item.href)
			return window.open(item.href, '_blank')
		openWindow(`${item.fileType}${item.kind}`, item)
	}
	const { activeLocation, setActiveLocation } = useLocationStore()

	const renderList = (items, name) => (
		<div>
			{name && <h3>{name}</h3>}

			<ul>
				{items.map(item => (
					<li
						key={item.id}
						onClick={() => setActiveLocation(item)}
						className={clsx(
							item.id === activeLocation?.id ? 'active' : 'not-active'
						)}
					>
						<img src={item.icon} className='w-4' alt={item.name} />
						<p className='text-sm font-medium truncate'>{item.name}</p>
					</li>
				))}
			</ul>
		</div>
	)

	return (
		<>
			<div className='window-header'>
				<WindowControlls target='finder' />
				<Search className='icon' />
			</div>

			<div className='bg-white flex h-full'>
				<div className='sidebar'>
					{renderList(Object.values(locations), 'Favorites')}
					{renderList(locations.work.children, 'My projects')}
				</div>
				<ul className='content'>
					{activeLocation?.children?.map(item => (
						<li
							key={item.id}
							className={item.position}
							onClick={() => openItem(item)}
						>
							<img src={item.icon} alt={item.name} />
							<p>{item.name}</p>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}

const FinderWindow = WindowWrapper(Finder, 'finder')

export default FinderWindow
