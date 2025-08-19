export default function Body({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        {children}
      </div>
    </main>
  )
}