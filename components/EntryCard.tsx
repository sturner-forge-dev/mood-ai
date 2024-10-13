import { JournalEntry } from '@/types/JournalEntry'

const EntryCard = ({ entry }: { entry: JournalEntry }) => {
  return <div>{entry.id}</div>
}

export default EntryCard
