import { HeartPulse } from 'lucide-react'

export function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center justify-center">
        <HeartPulse
          className="h-16 w-16 animate-pulse fill-default"
          strokeWidth={1}
        />
      </div>
    </div>
  )
}
