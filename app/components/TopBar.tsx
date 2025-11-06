'use client'

import { usePhotoStore } from '@/store/photoStore'
import { 
  Settings, 
  Menu, 
  X, 
  FileEdit,
  Share2,
  Printer,
  Play,
  Cloud,
  FileText,
  Ruler,
  ScanText,
  Sparkles,
  User
} from 'lucide-react'

export default function TopBar() {
  const { photos, currentIndex } = usePhotoStore()
  const currentPhoto = photos[currentIndex]

  return (
    <div className="fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-3 z-50">
           {/* <div className="h-6 w-px bg-white/10 mx-2"></div> */}
        
        <span className="text-xs text-gray-300 w-24">{currentPhoto?.name}</span>
      <div className="flex items-center gap-2">
        <button className="px-3 h-8 flex items-center gap-1.5 hover:bg-white/10 rounded transition-colors text-xs">
          <FileEdit className="w-3.5 h-3.5" />
          <span>编辑</span>
        </button>
        <button className="px-3 h-8 flex items-center gap-1.5 hover:bg-white/10 rounded transition-colors text-xs">
          <Share2 className="w-3.5 h-3.5" />
          <span>转换</span>
        </button>
        <button className="px-3 h-8 flex items-center gap-1.5 hover:bg-white/10 rounded transition-colors text-xs">
          <Printer className="w-3.5 h-3.5" />
          <span>打印</span>
        </button>
        <button className="px-3 h-8 flex items-center gap-1.5 hover:bg-white/10 rounded transition-colors text-xs">
          <Play className="w-3.5 h-3.5" />
          <span>幻灯片</span>
        </button>
        <button className="px-3 h-8 flex items-center gap-1.5 hover:bg-white/10 rounded transition-colors text-xs">
          <Cloud className="w-3.5 h-3.5" />
          <span>云盘</span>
        </button>
        <button className="px-3 h-8 flex items-center gap-1.5 hover:bg-white/10 rounded transition-colors text-xs">
          <FileText className="w-3.5 h-3.5" />
          <span>转Word</span>
        </button>
        <button className="px-3 h-8 flex items-center gap-1.5 hover:bg-white/10 rounded transition-colors text-xs">
          <Ruler className="w-3.5 h-3.5" />
          <span>尺寸</span>
        </button>
        <button className="px-3 h-8 flex items-center gap-1.5 hover:bg-white/10 rounded transition-colors text-xs">
          <ScanText className="w-3.5 h-3.5" />
          <span>图文识别</span>
        </button>
        <button className="px-3 h-8 flex items-center gap-1.5 hover:bg-white/10 rounded transition-colors text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI工具箱</span>
        </button>
    
      </div>
      
      <div className="flex items-center gap-1">
        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
          <User className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors">
          <Settings className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors">
          <Menu className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

