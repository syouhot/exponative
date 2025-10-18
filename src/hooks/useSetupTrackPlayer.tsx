import { useEffect, useRef } from "react"

const setupPlayer = async () => {
}
export default function useSetupTrackPlayer({ onLoad }: { onLoad?: () => void }) {
  const isInitialized = useRef(false)
  //这里功能不完全
  useEffect(() => {
      try {
        setupPlayer().then(() => {
          console.log("初始化成功");
          isInitialized.current = true
          onLoad?.()
        }).catch(e => {
          isInitialized.current = false
          console.log("初始化失败", e);
        })
      } catch (e) {
        console.log("初始化失败2222", e);
      }
  }, [onLoad])
}
