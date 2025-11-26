import { WindowControlls } from '@components/index'
import WindowWrapper from '@hoc/WindowWrapper'
import useWindowStore from '@store/window'

const ImageFile = () => {
  const { windows } = useWindowStore()
  const data = windows?.imgfile?.data

  if (!data) return null

  const { name, imageUrl, image } = data
  const src = imageUrl || image

  if (!src) return null

  return (
    <>
      <div className='window-header'>
        <WindowControlls target='imgfile' />
        <h2>{name || 'Image'}</h2>
      </div>

      <div className='bg-white h-full overflow-auto p-4'>
        <div className='w-full flex justify-center'>
          <img src={src} alt={name || 'image'} className='max-h-[70vh] object-contain rounded' />
        </div>
      </div>
    </>
  )
}

const ImageFileWindow = WindowWrapper(ImageFile, 'imgfile')

export default ImageFileWindow
