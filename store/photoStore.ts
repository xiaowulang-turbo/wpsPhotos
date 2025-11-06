import { create } from 'zustand'

interface Photo {
  src: string
  name: string
  type: 'human' | 'document' | 'landscape' | 'goods'
}

interface PhotoState {
  photos: Photo[]
  currentIndex: number
  rotation: number
  transformRef: any
  setTransformRef: (ref: any) => void
  nextPhoto: () => void
  prevPhoto: () => void
  rotateLeft: () => void
  rotateRight: () => void
  resetView: () => void
}

export const usePhotoStore = create<PhotoState>((set, get) => ({
  photos: [
    { src: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36', name: 'human.webp', type: 'human' },
    { src: 'https://images.unsplash.com/photo-1528459199957-0ff28496a7f6', name: 'document.jpg', type: 'document' },
    { src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', name: 'landscape.jpg', type: 'landscape' },
    { src: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86', name: 'goods.jpg', type: 'goods' },
    // { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05', name: 'nature.jpg' },
  ],
  currentIndex: 0,
  rotation: 0,
  transformRef: null,
  
  setTransformRef: (ref) => set({ transformRef: ref }),
  
  nextPhoto: () => {
    const { currentIndex, photos, transformRef } = get()
    if (currentIndex < photos.length - 1) {
      set({ currentIndex: currentIndex + 1, rotation: 0 })
      transformRef?.resetTransform()
    }
  },
  
  prevPhoto: () => {
    const { currentIndex, transformRef } = get()
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1, rotation: 0 })
      transformRef?.resetTransform()
    }
  },
  
  rotateLeft: () => set((state) => ({ rotation: state.rotation - 90 })),
  rotateRight: () => set((state) => ({ rotation: state.rotation + 90 })),
  
  resetView: () => {
    const { transformRef } = get()
    set({ rotation: 0 })
    transformRef?.resetTransform()
  },
}))

