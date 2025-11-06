'use client'

import { useAgentStore } from '@/store/agentStore'
import { useState } from 'react'
import { X, Send, Plus, Share2, Clock, Image, Globe, Bot, AtSign, ArrowUp, MessageSquare, ImageIcon, Sparkles } from 'lucide-react'

export default function AgentSidebar() {
  const { isOpen, messages, uploadedFiles, toggleSidebar, addMessage, clearMessages, shareConversation, addFile, removeFile } = useAgentStore()
  const [input, setInput] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const [thinkMode, setThinkMode] = useState(false)
  const [showUploadPanel, setShowUploadPanel] = useState(false)
  const [isWebSearchEnabled, setIsWebSearchEnabled] = useState(false)
  const [showModelSelect, setShowModelSelect] = useState(false)
  const [showAtPanel, setShowAtPanel] = useState(false)
  const [selectedModel, setSelectedModel] = useState('Nano Banana')
  const hasMessages = messages.length > 0

  const models = ['GPT-4', 'Gemini Imagen 4', 'Nano Banana', 'SeedDream ']

  const handleNewChat = () => {
    clearMessages()
  }

  const handleShare = () => {
    if (hasMessages) {
      shareConversation()
    }
  }

  const handleUploadImage = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*,application/pdf,.doc,.docx'
    input.multiple = true
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files
      if (files) {
        Array.from(files).forEach(file => addFile(file))
        setShowUploadPanel(false)
      }
    }
    input.click()
  }

  const handleSend = () => {
    if (input.trim()) {
      addMessage('user', input)
      setInput('')
      
      // 模拟AI回复
      setTimeout(() => {
        addMessage('assistant', '好的！我正在分析您的需求，请稍等...')
      }, 500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handlePolish = () => {
    if (input.trim()) {
      // 模拟AI润色：添加更专业的语气和详细描述
      const polished = `请帮我${input.trim()}。要求：\n1. 保持原图质量\n2. 处理后的效果自然\n3. 如有疑问可以询问我`
      setInput(polished)
    }
  }

  return (
    <>
      {/* 遮罩层 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={toggleSidebar}
        />
      )}
      
      {/* 侧边栏 */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-[#1a1a1a] border-l border-white/5 z-50 transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* 头部 */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
              <img src="/images/icon.png" alt="AI助手" className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">AI 图片助手</span>
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={handleNewChat}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
              title="新建对话"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button 
              onClick={handleShare}
              disabled={!hasMessages}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="分享对话"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
              title="历史对话"
            >
              <Clock className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleSidebar}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
              title="关闭"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 历史对话面板 */}
        {showHistory && (
          <div className="bg-[#2b2b2b] border-b border-white/5 p-4 shrink-0">
            <div className="text-sm text-gray-400 text-center">暂无历史对话</div>
          </div>
        )}

        {/* 主内容区 */}
        {!hasMessages ? (
          // 初始状态：居中显示欢迎界面
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 overflow-hidden">
              <img src="/images/icon.png" alt="AI助手" className="w-10 h-10" />
            </div>
            <h2 className="text-lg font-medium mb-2">Hi，我是你的AI图片助手</h2>
            <p className="text-sm text-gray-400 text-center mb-8">让我们开始今天的创意吧！</p>
            
            {/* 居中输入框 */}
            <div className="w-full relative">
              {/* 上传面板 */}
              {showUploadPanel && (
                <div className="absolute bottom-64 left-4 bg-[#2b2b2b] border border-white/10 rounded-lg shadow-lg overflow-hidden z-50">
                  <button
                    onClick={handleUploadImage}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap"
                  >
                    <Image className="w-4 h-4" />
                    <span>上传文件</span>
                  </button>
                </div>
              )}

              {/* 模型选择面板 */}
              {showModelSelect && (
                <div className="absolute bottom-40 left-[88px] bg-[#2b2b2b] border border-white/10 rounded-lg shadow-lg overflow-hidden z-50 min-w-[120px]">
                  {models.map((model) => (
                    <button
                      key={model}
                      onClick={() => {
                        setSelectedModel(model)
                        setShowModelSelect(false)
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-white/5 transition-colors ${
                        selectedModel === model ? 'text-blue-400' : 'text-gray-300'
                      }`}
                    >
                      <span>{model}</span>
                      {selectedModel === model && <span className="text-blue-400">✓</span>}
                    </button>
                  ))}
                </div>
              )}

              {/* @面板 */}
              {showAtPanel && (
                <div className="absolute bottom-56 left-[44px] bg-[#2b2b2b] border border-white/10 rounded-lg shadow-lg overflow-hidden z-50 min-w-[160px]">
                  <button
                    onClick={() => {
                      setShowAtPanel(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>历史对话</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowAtPanel(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>云相册图片</span>
                  </button>
                </div>
              )}

              <div className="bg-[#2b2b2b] rounded-lg border border-white/10 overflow-hidden">
                {/* 上传的文件标签 */}
                {uploadedFiles.length > 0 && (
                  <div className="px-4 pt-3 pb-2 border-b border-white/5">
                    <div className="flex flex-wrap gap-2">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 rounded px-2 py-1 text-xs transition-colors max-w-[200px]"
                          title={file.name}
                        >
                          <span className="shrink-0">{file.type.startsWith('image/') ? '🖼️' : '📄'}</span>
                          <span className="text-gray-300 truncate">{file.name}</span>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="hover:text-red-400 transition-colors shrink-0"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* 输入区域 */}
                <div className="relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="请输入你的设计需求"
                    className="w-full bg-transparent text-white text-sm px-4 pt-3 pb-12 resize-none focus:outline-none min-h-[100px] scrollbar-transparent"
                    rows={3}
                  />
                  
                  {/* AI 润色按钮 - 悬浮在右上角 */}
                  {input.trim() && (
                    <button
                      onClick={handlePolish}
                      className="absolute top-10 right-2 flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                      title="AI润色"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span> </span>
                    </button>
                  )}
                  
                  {/* 底部工具栏 */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2 border-t border-white/5 bg-[#2b2b2b]">
                    <div className="flex items-center gap-1 relative">
                      <button 
                        onClick={() => setShowUploadPanel(!showUploadPanel)}
                        className={`w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors ${showUploadPanel ? 'bg-white/10' : ''}`} 
                        title="添加"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setShowAtPanel(!showAtPanel)}
                        className={`w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors ${showAtPanel ? 'bg-white/10' : ''}`}
                        title="@"
                      >
                        <AtSign className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setIsWebSearchEnabled(!isWebSearchEnabled)}
                        className={`w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors ${isWebSearchEnabled ? 'bg-blue-600' : ''}`} 
                        title="联网搜索"
                      >
                        <Globe className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setShowModelSelect(!showModelSelect)}
                        className={`w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors ${showModelSelect ? 'bg-white/10' : ''}`} 
                        title={`当前模型: ${selectedModel}`}
                      >
                        <Bot className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setThinkMode(!thinkMode)}
                        className={`text-xs px-3 py-1 h-8 rounded transition-colors ${
                          thinkMode ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        思考模式
                      </button>
                      <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="w-8 h-8 flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 示例提示 */}
              <div className="mt-6 space-y-2">
                <p className="text-xs text-gray-500">试试这些：</p>
                <button
                  onClick={() => setInput('请根据这张照片制作一张白色背景的 1 寸证件照（25mm×35mm），分辨率为 300DPI，大约 295×413 像素，格式为 PNG，不含文字与边框，文件大小不超过 500KB。')}
                  className="w-full text-left text-sm text-gray-300 bg-[#2b2b2b] hover:bg-[#333] px-4 py-3 rounded-lg transition-colors"
                >
                  📸 一键制作标准证件照 - 白底 1 寸，符合规范
                </button>
                <button
                  onClick={() => setInput('帮我去除图片背景，保留主体人物/物品，输出透明背景的 PNG 格式图片。')}
                  className="w-full text-left text-sm text-gray-300 bg-[#2b2b2b] hover:bg-[#333] px-4 py-3 rounded-lg transition-colors"
                >
                  ✂️ 智能抠图去背景 - 保留主体，输出透明底
                </button>
                <button
                  onClick={() => setInput('将这张图片压缩到 200KB 以内，保持清晰度，格式为 JPG。')}
                  className="w-full text-left text-sm text-gray-300 bg-[#2b2b2b] hover:bg-[#333] px-4 py-3 rounded-lg transition-colors"
                >
                  🗜️ 压缩图片文件 - 减小体积不失清晰
                </button>
                <button
                  onClick={() => setInput('调整图片尺寸为 1920×1080 像素，保持比例，不变形。')}
                  className="w-full text-left text-sm text-gray-300 bg-[#2b2b2b] hover:bg-[#333] px-4 py-3 rounded-lg transition-colors"
                >
                  📐 调整图片尺寸 - 自定义分辨率不变形
                </button>
                <button
                  onClick={() => setInput('帮我美化这张照片，提升亮度和对比度，让色彩更鲜艳自然。')}
                  className="w-full text-left text-sm text-gray-300 bg-[#2b2b2b] hover:bg-[#333] px-4 py-3 rounded-lg transition-colors"
                >
                  ✨ 智能美化增强 - 优化色彩让照片更出彩
                </button>
              </div>
            </div>
          </div>
        ) : (
          // 聊天状态：显示聊天记录
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-[#2b2b2b] text-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-60 mt-1 block" suppressHydrationWarning>
                      {message.timestamp.toLocaleTimeString('zh-CN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 底部输入区域 */}
            <div className="p-4 border-t border-white/5 shrink-0 relative">
              {/* 上传面板 */}
              {showUploadPanel && (
                <div className="absolute bottom-20 left-8 bg-[#2b2b2b] border border-white/10 rounded-lg shadow-lg overflow-hidden z-50">
                  <button
                    onClick={handleUploadImage}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap"
                  >
                    <Image className="w-4 h-4" />
                    <span>上传文件</span>
                  </button>
                </div>
              )}

              {/* 模型选择面板 */}
              {showModelSelect && (
                <div className="absolute bottom-20 left-[104px] bg-[#2b2b2b] border border-white/10 rounded-lg shadow-lg overflow-hidden z-50 min-w-[120px]">
                  {models.map((model) => (
                    <button
                      key={model}
                      onClick={() => {
                        setSelectedModel(model)
                        setShowModelSelect(false)
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-white/5 transition-colors ${
                        selectedModel === model ? 'text-blue-400' : 'text-gray-300'
                      }`}
                    >
                      <span>{model}</span>
                      {selectedModel === model && <span className="text-blue-400">✓</span>}
                    </button>
                  ))}
                </div>
              )}

              {/* @面板 */}
              {showAtPanel && (
                <div className="absolute bottom-20 left-[56px] bg-[#2b2b2b] border border-white/10 rounded-lg shadow-lg overflow-hidden z-50 min-w-[160px]">
                  <button
                    onClick={() => {
                      setShowAtPanel(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>历史对话</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowAtPanel(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>云相册图片</span>
                  </button>
                </div>
              )}

              <div className="bg-[#2b2b2b] rounded-lg border border-white/10 overflow-hidden">
                {/* 上传的文件标签 */}
                {uploadedFiles.length > 0 && (
                  <div className="px-4 pt-3 pb-2 border-b border-white/5">
                    <div className="flex flex-wrap gap-2">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 rounded px-2 py-1 text-xs transition-colors max-w-[200px]"
                          title={file.name}
                        >
                          <span className="shrink-0">{file.type.startsWith('image/') ? '🖼️' : '📄'}</span>
                          <span className="text-gray-300 truncate">{file.name}</span>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="hover:text-red-400 transition-colors shrink-0"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* 输入区域 */}
                <div className="relative overflow-hidden round-b-lg">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="请输入你的需求"
                    className="w-full bg-transparent text-white text-sm px-4 pt-3 pb-12 resize-none focus:outline-none max-h-32 scrollbar-transparent"
                    rows={2}
                  />
                  
                  {/* AI 润色按钮 - 悬浮在右上角 */}
                  {input.trim() && (
                    <button
                      onClick={handlePolish}
                      className="absolute top-8 right-2 flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                      title="AI润色"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span> </span>
                    </button>
                  )}
                  
                  {/* 底部工具栏 */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2 border-t border-white/5 bg-[#2b2b2b]">
                    <div className="flex items-center gap-1 relative">
                      <button 
                        onClick={() => setShowUploadPanel(!showUploadPanel)}
                        className={`w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors ${showUploadPanel ? 'bg-white/10' : ''}`} 
                        title="添加"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setShowAtPanel(!showAtPanel)}
                        className={`w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors ${showAtPanel ? 'bg-white/10' : ''}`}
                        title="@"
                      >
                        <AtSign className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setIsWebSearchEnabled(!isWebSearchEnabled)}
                        className={`w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors ${isWebSearchEnabled ? 'bg-blue-600' : ''}`} 
                        title="联网搜索"
                      >
                        <Globe className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setShowModelSelect(!showModelSelect)}
                        className={`w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors ${showModelSelect ? 'bg-white/10' : ''}`} 
                        title={`当前模型: ${selectedModel}`}
                      >
                        <Bot className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setThinkMode(!thinkMode)}
                        className={`text-xs px-3 py-1 rounded transition-colors ${
                          thinkMode ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        思考模式
                      </button>
                      <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="w-8 h-8 flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

