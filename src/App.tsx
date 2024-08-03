import { useCallback, useRef, useState } from 'react'
import { Controls, Player } from '@lottiefiles/react-lottie-player'

import './App.css'
import { saveFile } from './saveFile'

function App() {
  const playerRef = useRef<Player>(null)
  const [data, setData] = useState<object | null>(null)
  const [name, setName] = useState('')
  const handleSelectFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const dataText = await file.text()
        setData(JSON.parse(dataText))
        setName(file.name)
      }
      catch (e) {

      }
    }
  }, [])
  const handleExport = useCallback(async () => {
    const animData = playerRef.current?.state.animationData
    const container = playerRef.current?.container
    if (animData && container) {
      const svgText = container.innerHTML
      saveFile(name.replace('.json', ''), svgText)
    }
  }, [name,])
  return (
    <>
      <div className='actions'>
        <label className='file-input'>
          <input type="file" id="file" name="file" accept='.json' onChange={handleSelectFile} />
          <button>Select File</button>
        </label>
        <button disabled={!data} onClick={handleExport}>Export SVG</button>
      </div>
      <div style={{ width: '400px' }}>
        <Player
          ref={playerRef}
          src={data || ''}
          autoplay={false}
          loop={false}
          renderer="svg"
          style={{ height: '400px', width: '400px', border: '1px solid black' }}

        >
          <Controls visible={true} buttons={['frame']} />
        </Player>
      </div>
    </>
  )
}

export default App
