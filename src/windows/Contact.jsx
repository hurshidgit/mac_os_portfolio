import WindowControlls from '@components/WindowControlls'
import { socials } from '@constants/index'
import WindowWrapper from '@hoc/WindowWrapper'

const Contact = () => {
	return (
		<>
			<div className='window-header'>
				<WindowControlls target={'contact'} />
				<h2>Contact Me</h2>
			</div>
			<div className='bg-white h-full overflow-auto p-5 space-y-5'>
				<img
					src='/images/hurshid.jpg'
					alt='Hurshid'
					className='w-20 rounded-full'
				/>

				<h3>Let's Connect</h3>
				<p>Got an idea? A bug to squash? Or just wanna talk tech? I'm in.</p>

				{/* Ul uchun grid klasslari #contact ul dagi global flex qoidasi bilan to'qnashadi. */}
				<ul>
					{socials.map(({ id, bg, link, icon, text }) => (
						<li
							key={id}
							style={{ backgroundColor: bg }}
							className='rounded-md overflow-hidden'
						>
							12
							<a
								href={link}
								target='_blank'
								rel='noopener noreferrer'
								className='col-center text-white'
								title={text}
							>
								<img src={icon} alt={text} className='size-7' />
								<p className='font-medium text-sm'>{text}</p>
							</a>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}

const ContactWindow = WindowWrapper(Contact, 'contact')

export default ContactWindow
