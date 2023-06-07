// EntryRepository.js
class EntryRepository {
  constructor() {
    // Initialize the repository with an empty array or fetch data from an API
    this.entries = [
        {
          id: 1,
          date: '2023-06-01',
          amount: 100,
          account: 'Savings',
          category: 'Expense',
          concept1: 'Groceries'
        },
        {
          id: 2,
          date: '2023-06-02',
          amount: 50,
          account: 'Checking',
          category: 'Expense',
          concept1: 'Dining Out'
        },
        {
          id: 3,
          date: '2023-06-03',
          amount: 200,
          account: 'Savings',
          category: 'Income',
          concept1: 'Salary'
        }
      ];
  }

  getAllEntries() {
    // Return all entries
    return this.entries;
  }

  getEntryById(id) {
    // Find and return the entry with the specified id
    return this.entries.find((entry) => entry.id === id);
  }

  addEntry(entry) {
    // Generate a unique id for the new entry
    const newId = Date.now();
    const newEntry = { ...entry, id: newId };
    
    // Add the new entry to the repository
    this.entries.push(newEntry);

    // Return the newly added entry
    return newEntry;
  }

  updateEntry(id, updatedEntry) {
    // Find the entry with the specified id
    const entryIndex = this.entries.findIndex((entry) => entry.id === id);

    // If the entry exists, update its values
    if (entryIndex !== -1) {
      this.entries[entryIndex] = { ...updatedEntry, id };
    }

    // Return the updated entry or null if not found
    return this.entries[entryIndex] || null;
  }

  deleteEntry(id) {
    // Find the entry with the specified id
    const entryIndex = this.entries.findIndex((entry) => entry.id === id);

    // If the entry exists, remove it from the repository
    if (entryIndex !== -1) {
      this.entries.splice(entryIndex, 1);
    }
  }
}

export default EntryRepository;
