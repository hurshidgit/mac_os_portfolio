import { WindowControlls } from '@components/index'
import { techStack } from '@constants/index'
import WindowWrapper from '@hoc/WindowWrapper'
import { Check, Flag } from 'feather-icons-react'

const Terminal = () => {
	return (
		<>
			<div id='window-header'>
				<WindowControlls target='terminal' />
				<h2>Tech Stack</h2>
			</div>

			<div className='techstack'>
				<p>
					<span className='fond-bold'>@hurshid %</span> how tech stack
				</p>

				<div className='label'>
					<p className='w-32'>Category</p>
					<p>Technologies</p>
				</div>

				<ul className='content'>
					{techStack.map(({ category, items }) => (
						<li className='flex items-center' key={category}>
							<Check className='check' size={20} />
							<h3>{category}</h3>
							<ul>
								{items.map((item, i) => (
									<li key={i}>
										{item} {i < items.length - 1 ? ',' : ''}
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
				<div className='footnote'>
					<p>
						<Check size={20} /> 5 of 5 stacks loaded successfully (100%)
					</p>
					<p className='text-black'>
						<Flag size={15} fill='black' />
						Render time: 6ms
					</p>
				</div>
			</div>
		</>
	)
}

const TerminalWindow = WindowWrapper(Terminal, 'terminal')

export default TerminalWindow
