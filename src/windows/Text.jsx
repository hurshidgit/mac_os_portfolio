import { WindowControlls } from '@components/index'
import WindowWrapper from '@hoc/WindowWrapper'
import useWindowStore from '@store/window'

const Text = () => {
  const { windows } = useWindowStore()
  const data = windows?.txtfile?.data

  if (!data) return null

  const {
    name,
    subtitle,
    image, // optional image path (e.g., '/images/...')
    imageUrl, // optional alt key used by some items
    description = [], // array of paragraphs
  } = data

  const imgSrc = image || imageUrl

  return (
    <>
      <div className='window-header'>
        <WindowControlls target='txtfile' />
        <h2>{name || 'Text file'}</h2>
      </div>

      <div className='bg-white h-full overflow-auto p-4 space-y-4'>
        {imgSrc && (
          <div className='w-full flex justify-center'>
            <img
              src={imgSrc}
              alt={name || 'image'}
              className='max-h-64 object-contain rounded'
            />
          </div>
        )}

        {subtitle && (
          <p className='text-gray-600 text-sm md:text-base'>{subtitle}</p>
        )}

        {Array.isArray(description) && description.length > 0 && (
          <div className='space-y-3'>
            {description.map((para, i) => (
              <p key={i} className='leading-relaxed text-sm md:text-base'>
                {para}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

const TextWindow = WindowWrapper(Text, 'txtfile')

export default TextWindow
