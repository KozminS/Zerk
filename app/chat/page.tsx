import InteractiveChat from "@/components/ui/InteractiveChat"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-bg relative flex flex-col items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-accent/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[30vw] h-[30vw] bg-blue-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-4xl z-10 flex flex-col items-center gap-8">
        <div className="text-center space-y-3">
          <h1 className="text-h2 font-black tracking-tighter text-white">
            Demo <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-8">Chatbot</span>
          </h1>
          <p className="text-p-01 text-white/50 max-w-xl mx-auto">
            Исследуйте возможности AI-агента Zerk с поддержкой мультимедиа и локаций.
          </p>
        </div>

        <InteractiveChat />

        <div className="flex gap-6 mt-4">
          <div className="flex items-center gap-2 text-p-03 text-white/40 bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <span className="w-2 h-2 rounded-full bg-accent"></span>
            Multimedia Support
          </div>
          <div className="flex items-center gap-2 text-p-03 text-white/40 bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <span className="w-2 h-2 rounded-full bg-accent"></span>
            Location Cards
          </div>
          <div className="flex items-center gap-2 text-p-03 text-white/40 bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <span className="w-2 h-2 rounded-full bg-accent"></span>
            Gemini Flash 1.5
          </div>
        </div>
      </div>
    </div>
  )
}
