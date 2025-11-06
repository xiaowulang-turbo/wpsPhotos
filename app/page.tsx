'use client'

import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'
import ImageViewer from './components/ImageViewer'
import DraggableIcon from './components/DraggableIcon'
import AgentSidebar from './components/AgentSidebar'
import { usePhotoStore } from '@/store/photoStore'
import { useEffect } from 'react'
import { Toaster } from 'sonner'

export default function Home() {
  const { nextPhoto, prevPhoto, transformRef, resetView } = usePhotoStore()

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          prevPhoto()
          break
        case 'ArrowRight':
          nextPhoto()
          break
        case '=':
        case '+':
          transformRef?.zoomIn()
          break
        case '-':
          transformRef?.zoomOut()
          break
        case '0':
          resetView()
          break
      }
    }

    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [nextPhoto, prevPhoto, transformRef, resetView])

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#2b2b2b]">
      <TopBar />
      <ImageViewer />
      <BottomBar />
      <DraggableIcon />
      <AgentSidebar />
      <Toaster position="top-center" theme="dark" />
    </main>
  )
}

