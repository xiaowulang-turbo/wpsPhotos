'use client'

import { useState, useRef, useEffect } from 'react'
import { useAgentStore } from '@/store/agentStore'
import { usePhotoStore } from '@/store/photoStore'
import { X } from 'lucide-react'
import { toast } from 'sonner'

const recommendationsByType = {
  human: [
    { label: '一键抠图', prompt: '请帮我去除这张人像照片的背景，保留主体人物，输出透明背景的PNG格式图片。' },
    { label: '一键证件照', prompt: '请根据这张照片制作一张白色背景的1寸证件照（25mm×35mm），分辨率为300DPI，格式为PNG。' },
  ],
  document: [
    { label: 'OCR文字识别', prompt: '请识别这张文档图片中的所有文字内容，并以文本格式输出。' },
    { label: '图片转PDF', prompt: '请将这张文档图片转换为PDF格式。' },
  ],
  landscape: [
    { label: '智能美化', prompt: '请美化这张风景照片，提升色彩饱和度、对比度和清晰度，让画面更有视觉冲击力。' },
    { label: '天空替换', prompt: '请为这张风景照片替换一个更美的天空效果，保持自然过渡。' },
  ],
  goods: [
    { label: '一键抠图', prompt: '请去除这张商品图片的背景，保留商品主体，输出白色背景的图片。' },
    { label: '商品精修', prompt: '请对这张商品图片进行精修，提升清晰度、调整光影，使商品更具吸引力。' },
  ],
}

export default function DraggableIcon() {
  const { toggleSidebar, isOpen, showRecommendation, setShowRecommendation, isAgentVisible, setAgentVisible } = useAgentStore()
  const { photos, currentIndex } = usePhotoStore()
  const [floatingPosition, setFloatingPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [hasMoved, setHasMoved] = useState(false)
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 })
  const iconRef = useRef<HTMLDivElement>(null)
  const contextMenuRef = useRef<HTMLDivElement>(null)

  const currentPhoto = photos[currentIndex]
  const recommendations = currentPhoto ? recommendationsByType[currentPhoto.type] : []

  useEffect(() => {
    // 初始化悬浮位置（右上角）
    setFloatingPosition({ 
      x: window.innerWidth - 240, 
      y: 160 
    })
  }, [])

  // 当切换图片时自动显示推荐气泡
  useEffect(() => {
    if (!isOpen) {
      setShowRecommendation(true)
    }
  }, [currentIndex, setShowRecommendation])

  // 点击外部关闭右键菜单
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        setShowContextMenu(false)
      }
    }
    
    if (showContextMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showContextMenu])

  useEffect(() => {
    if (isDragging && !isOpen) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, isOpen, dragOffset, hasMoved])

  const handleMouseDown = (e: React.MouseEvent) => {
    // 只处理左键点击
    if (e.button !== 0) return
    // 侧边栏打开时禁用拖拽
    if (isOpen) return
    
    setIsDragging(true)
    setHasMoved(false)
    setDragOffset({
      x: e.clientX - floatingPosition.x,
      y: e.clientY - floatingPosition.y
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setHasMoved(true)
      setFloatingPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      })
    }
  }

  const handleMouseUp = () => {
    if (isDragging && !hasMoved) {
      // 如果没有移动，触发点击事件
      handleClick()
    }
    setIsDragging(false)
    setHasMoved(false)
  }

  const handleClick = () => {
    toggleSidebar()
  }

  const handleRecommendationClick = (label: string) => {
    // 关闭推荐气泡
    setShowRecommendation(false)
    
    // 显示加载中的toast（sonner 的 loading 方法自带旋转动画）
    const loadingToastId = toast.loading('应用中')
    
    // 3秒后显示成功提示
    setTimeout(() => {
      toast.success(`应用"${label}"成功`, {
        id: loadingToastId,
        duration: 2000,
      })
    }, 3000)
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    // 侧边栏打开时禁用右键菜单
    if (isOpen) return
    
    setContextMenuPos({ x: e.clientX, y: e.clientY })
    setShowContextMenu(true)
  }

  const handleEnterAgent = () => {
    setShowContextMenu(false)
    if (!isOpen) {
      toggleSidebar()
    }
  }

  const handleCloseAgent = () => {
    setShowContextMenu(false)
    setShowRecommendation(false)
    setAgentVisible(false)
    if (isOpen) {
      toggleSidebar()
    }
  }

  if (!isAgentVisible) {
    return null
  }

  // 计算目标位置：侧边栏打开时移动到侧边栏右上角，否则使用悬浮位置
  const targetPosition = isOpen 
    ? { x: typeof window !== 'undefined' ? window.innerWidth - 364 : 0, y: 16 } 
    : floatingPosition

  return (
    <>
      {/* 右键菜单 */}
      {showContextMenu && (
        <div
          ref={contextMenuRef}
          className="fixed bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl overflow-hidden select-none"
          style={{
            left: `${contextMenuPos.x}px`,
            top: `${contextMenuPos.y}px`,
            zIndex: 51,
          }}
        >
          <div className="py-1">
            <button
              onClick={handleEnterAgent}
              className="w-full text-left text-sm text-gray-200 hover:bg-white/10 px-4 py-2 transition-colors"
            >
              进入助手
            </button>
            <button
              onClick={handleCloseAgent}
              className="w-full text-left text-sm text-gray-200 hover:bg-white/10 px-4 py-2 transition-colors"
            >
              关闭助手
            </button>
          </div>
        </div>
      )}

      {/* 推荐气泡 */}
      {showRecommendation && !isOpen && recommendations.length > 0 && (
        <div
          className="fixed select-none"
          style={{
            left: `${floatingPosition.x - 240}px`,
            top: `${floatingPosition.y}px`,
            zIndex: 49,
            transition: isDragging ? 'none' : 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1), top 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl p-3 w-56">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">为你推荐</span>
              <button
                onClick={() => setShowRecommendation(false)}
                className="w-5 h-5 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {recommendations.map((rec, index) => (
                <button
                  key={index}
                  onClick={() => handleRecommendationClick(rec.label)}
                  className="w-full text-left text-sm text-gray-200 bg-[#2b2b2b] hover:bg-[#333] px-3 py-2 rounded transition-colors"
                >
                  {rec.label}
                </button>
              ))}
            </div>
          </div>
          {/* 箭头指向图标 */}
          <div
            className="absolute w-3 h-3 bg-[#1a1a1a] border-r border-t border-white/10 rotate-45"
            style={{
              right: '-6px',
              top: '20px',
            }}
          />
        </div>
      )}

      {/* AI助手图标 */}
      <div
        ref={iconRef}
        className="fixed select-none transition-shadow hover:shadow-lg"
        style={{
          left: `${targetPosition.x}px`,
          top: `${targetPosition.y}px`,
          zIndex: isOpen ? 49 : 50,
          cursor: isOpen ? 'default' : (isDragging ? 'grabbing' : 'pointer'),
          pointerEvents: isOpen ? 'none' : 'auto',
          transition: isDragging 
            ? 'none' 
            : 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1), top 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseDown={handleMouseDown}
        onContextMenu={handleContextMenu}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
          <img 
            src="/images/icon.png" 
            alt="AI Agent"
            className="w-8 h-8 rounded-full"
            draggable={false}
          />
        </div>
      </div>
    </>
  )
}

