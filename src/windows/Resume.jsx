import { WindowControlls } from '@components/index'
import WindowWrapper from '@hoc/WindowWrapper'
import { Download } from 'feather-icons-react'
import { useCallback, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.mjs',
	import.meta.url
).toString()
const Resume = () => {
	const containerRef = useRef(null)

	// PDF ko'rinishidagi matn qatlamida ko'rinadigan matnlarni almashtirish (faqat UI darajasida)
	const replaceVisibleText = useCallback(() => {
		const root = containerRef.current
		if (!root) return
		// react-pdf text layer selektori
		const spans = root.querySelectorAll('.react-pdf__Page__textContent span')
		if (!spans.length) return

		const namePattern = /\bMark\b/gi
		const cityPattern = /new\s*york\s*shaxri/gi

		spans.forEach(span => {
			const txt = span.textContent
			if (!txt) return
			let next = txt.replace(namePattern, 'Hurshid')
			next = next.replace(cityPattern, 'Uzbekistan')
			if (next !== txt) {
				span.textContent = next
			}
		})
	}, [])

	return (
		<>
			<div className='window-header'>
				<WindowControlls target='resume' />
				<h2>Resume.pdf</h2>
				<a
					href='/files/resume.pdf'
					download
					className='cursor-pointer'
					title='Download resume.pdf'
				>
					<Download className='icon' />
				</a>
			</div>
			<div ref={containerRef}>
				<Document file='/files/resume.pdf'>
					<Page
						pageNumber={1}
						renderTextLayer
						renderAnnotationLayer
						onRenderSuccess={replaceVisibleText}
					/>
				</Document>
			</div>
		</>
	)
}

const ResumeWindow = WindowWrapper(Resume, 'resume')

export default ResumeWindow
