import { create } from 'zustand'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface UploadedFile {
  id: string
  name: string
  type: string
  file: File
}

interface AgentState {
  isOpen: boolean
  isAgentVisible: boolean
  messages: Message[]
  uploadedFiles: UploadedFile[]
  showRecommendation: boolean
  toggleSidebar: () => void
  setAgentVisible: (visible: boolean) => void
  addMessage: (role: 'user' | 'assistant', content: string) => void
  clearMessages: () => void
  shareConversation: () => void
  addFile: (file: File) => void
  removeFile: (id: string) => void
  clearFiles: () => void
  setShowRecommendation: (show: boolean) => void
}

export const useAgentStore = create<AgentState>((set, get) => ({
  isOpen: false,
  isAgentVisible: true,
  messages: [],
  uploadedFiles: [],
  showRecommendation: true,
  
  toggleSidebar: () => set((state) => ({ 
    isOpen: !state.isOpen,
    showRecommendation: false
  })),
  
  setAgentVisible: (visible) => set({ isAgentVisible: visible }),
  
  addMessage: (role, content) => 
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Date.now().toString(),
          role,
          content,
          timestamp: new Date(),
        },
      ],
    })),
  
  clearMessages: () => set({ messages: [] }),
  
  shareConversation: () => {
    const { messages } = get()
    const text = messages
      .map(m => `${m.role === 'user' ? '我' : 'AI'}: ${m.content}`)
      .join('\n\n')
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
    }
  },

  addFile: (file) =>
    set((state) => ({
      uploadedFiles: [
        ...state.uploadedFiles,
        {
          id: Date.now().toString(),
          name: file.name,
          type: file.type,
          file,
        },
      ],
    })),

  removeFile: (id) =>
    set((state) => ({
      uploadedFiles: state.uploadedFiles.filter((f) => f.id !== id),
    })),

  clearFiles: () => set({ uploadedFiles: [] }),

  setShowRecommendation: (show) => set({ showRecommendation: show }),
}))

