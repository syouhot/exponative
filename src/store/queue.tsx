import { create } from "zustand"

type QueueState = {
    activedQueueId: string | null
    setActiveQueueId: (id: string) => void
}

export const useQueueStore = create<QueueState>((set) => ({
    activedQueueId: null,
    setActiveQueueId: (id) => set({ activedQueueId: id }) 
}))

export const useQueue = () => useQueueStore(state => state)