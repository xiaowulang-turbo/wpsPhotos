'use client'

import { usePhotoStore } from '@/store/photoStore'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useRef, useEffect } from 'react'

export default function ImageViewer() {
  const { photos, currentIndex, rotation, setTransformRef } = usePhotoStore()
  const currentPhoto = photos[currentIndex]
  const isInitialized = useRef(false)

  return (
    <div className="fixed inset-0 flex items-center justify-center pt-12 pb-16">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={5}
        doubleClick={{ mode: 'reset' }}
        wheel={{ step: 0.1 }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => {
          if (!isInitialized.current) {
            setTransformRef({ zoomIn, zoomOut, resetTransform, ...rest })
            isInitialized.current = true
          }
          
          return (
            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="!w-full !h-full flex items-center justify-center"
            >
              <div
                className="transition-transform duration-200"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <img
                  src={currentPhoto?.src}
                  alt={currentPhoto?.name}
                  className="max-w-[90vw] max-h-[calc(100vh-112px)] object-contain"
                  draggable={false}
                />
              </div>
            </TransformComponent>
          )
        }}
      </TransformWrapper>
    </div>
  )
}

