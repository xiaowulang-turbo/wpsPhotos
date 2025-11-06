'use client'

import { usePhotoStore } from '@/store/photoStore'
import { useState, useEffect } from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  ZoomOut, 
  ZoomIn, 
  RotateCw,
  Copy,
  Trash2,
  Circle,
  MoreHorizontal
} from 'lucide-react'

export default function BottomBar() {
  const { 
    photos, 
    currentIndex, 
    transformRef,
    prevPhoto, 
    nextPhoto,
    rotateLeft,
    rotateRight,
    resetView
  } = usePhotoStore()
  
  const [zoom, setZoom] = useState(100)

  useEffect(() => {
    const updateZoom = () => {
      if (transformRef?.state?.scale) {
        setZoom(Math.round(transformRef.state.scale * 100))
      }
    }
    
    const interval = setInterval(updateZoom, 100)
    return () => clearInterval(interval)
  }, [transformRef])

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 flex items-center justify-center gap-6 px-4 z-50">
      <div className="flex items-center gap-1">
        <button 
          onClick={prevPhoto}
          disabled={currentIndex === 0}
          className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <span className="text-sm min-w-16 text-center text-gray-200">
          {currentIndex + 1}/{photos.length}
        </span>
        
        <button 
          onClick={nextPhoto}
          disabled={currentIndex === photos.length - 1}
          className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button 
          onClick={() => transformRef?.zoomOut()} 
          className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
          title="缩小"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        
        <button 
          onClick={resetView} 
          className="text-sm min-w-16 h-9 flex items-center justify-center hover:bg-white/10 rounded transition-colors text-gray-200"
          title="点击重置"
        >
          {zoom}%
        </button>
        
        <button 
          onClick={() => transformRef?.zoomIn()} 
          className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
          title="放大"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button 
          onClick={rotateLeft} 
          className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
          title="左旋转"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        
        <button 
          onClick={rotateRight} 
          className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
          title="右旋转"
        >
          <RotateCw className="w-4 h-4" />
        </button>
        
        <button 
          className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
          title="复制"
        >
          <Copy className="w-4 h-4" />
        </button>
        
        <button 
          className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
          title="删除"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        
        <button 
          className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
          title="更多"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

