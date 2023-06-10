import React, { useState } from 'react';
import EntryRepository from './EntryRepository';
import categoriesConfig from './categoriesConfig.json';

const entryRepository = new EntryRepository();

function App() {
  const [formData, setFormData] = useState(entryRepository.getAllEntries());
  const [categories, setCategories] = useState(categoriesConfig.categories);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const [newEntry, setNewEntry] = useState({
    date: '',
    amount: '',
    account: '',
    category: '',
    concept1: ''
  });

  const handleChange = (event) => {
    setNewEntry({ ...newEntry, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedEntry) {
      // Update existing entry
      const updatedData = entryRepository.updateEntry(selectedEntry, newEntry);

      if (updatedData) {
        setFormData(entryRepository.getAllEntries());
        setSelectedEntry(null);
      }
    }

    setNewEntry({
      date: '',
      amount: '',
      account: '',
      category: '',
      concept1: ''
    });
  };

  const handleEdit = (id) => {
    setSelectedEntry(id);
    const selectedData = entryRepository.getEntryById(id);
    setNewEntry({ ...selectedData });
  };

  const handleDelete = (id) => {
    entryRepository.deleteEntry(id);
    setFormData(entryRepository.getAllEntries());
    setNewEntry({
      date: '',
      amount: '',
      account: '',
      category: '',
      concept1: ''
    });
  };

  const handleCreate = (event) => {
    event.preventDefault();
    
    // Add new entry
    const addedData = entryRepository.addEntry(newEntry);
    
    if (addedData) {
      setFormData(entryRepository.getAllEntries());
      setSelectedEntry(null);
    }

    setNewEntry({
      date: '',
      amount: '',
      account: '',
      category: '',
      concept1: ''
    });
  };

  return (
    <div>
      <h1>Hello, World!</h1>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={newEntry.date}
          onChange={handleChange}
        />

        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          value={newEntry.amount}
          onChange={handleChange}
        />

        <label>Account:</label>
        <input
          type="text"
          name="account"
          value={newEntry.account}
          onChange={handleChange}
        />

        <label>Category:</label>
        <select
          name="category"
          value={newEntry.category}
          onChange={handleChange}
        ><option value="">Select a category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
        </select>

        <label>Concept 1:</label>
        <textarea
          name="concept1"
          value={newEntry.concept1}
          onChange={handleChange}
        ></textarea>

        {selectedEntry ? <button type="submit">Update</button> : ''}
        <button onClick={handleCreate}>Submit</button>
      </form>

      <h2>Submitted Data:</h2>
      {formData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Account</th>
              <th>Category</th>
              <th>Concept 1</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((entry, index) => (
              <tr key={entry.id}>
                <td>{entry.date}</td>
                <td>{entry.amount}</td>
                <td>{entry.account}</td>
                <td>{entry.category}</td>
                <td>{entry.concept1}</td>
                <td>
                  <button onClick={() => handleEdit(entry.id)}>Edit</button>
                  <button onClick={() => handleDelete(entry.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data submitted yet.</p>
      )}
    </div>
  );
}

export default App;
