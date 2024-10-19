import { JournalEntry } from '@/types/JournalEntry'

const EntryCard = ({ entry }: { entry: JournalEntry }) => {
  const date = new Date(entry.createdAt).toDateString()

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      <div className="px-4 py-5 sm:px-6">
        Analysis: {entry.analysis?.summary}
      </div>
      <div className="px-4 py-5 sm:px-6">Mood: {entry.analysis?.mood}</div>
    </div>
  )
}

export default EntryCard
