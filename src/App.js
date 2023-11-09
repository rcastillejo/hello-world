import React, { useState } from 'react';
import EntryRepository from './EntryRepository';
import dataListConfig from './dataListConfig.json';

const entryRepository = new EntryRepository();

function App() {
  const [formData, setFormData] = useState(entryRepository.getAllEntries());
  const [categories, setCategories] = useState(dataListConfig.categories);
  const [accounts, setAccounts] = useState(dataListConfig.accounts);

  const [selectedEntry, setSelectedEntry] = useState(null);

  const [newEntry, setNewEntry] = useState({
    date: '',
    amount: '',
    account: '',
    category: '',
    concept1: '',
    concept2: ''
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
      concept1: '',
      concept2: ''
    });
  };

  const handleEdit = (id) => {
    setSelectedEntry(id);
    const selectedData = entryRepository.getEntryById(id);
    setNewEntry({ ...selectedData });
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
      concept1: '',
      concept2: ''
    });
  };

  return (
    <div>
      <h1>Hello, Financial App!</h1>
      <form onSubmit={handleSubmit}>
        <label>Fecha:</label>
        <input
          type="date"
          name="date"
          value={newEntry.date}
          onChange={handleChange}
        />

        <label>Monto:</label>
        <input
          type="number"
          name="amount"
          value={newEntry.amount}
          onChange={handleChange}
        />

        <label>Cuenta:</label>
        <select
          name="account"
          value={newEntry.account}
          onChange={handleChange}
        ><option value="">Select an account</option>
        {accounts.map((account, index) => (
          <option key={index} value={account}>{account}</option>
        ))}
        </select>

        <label>Categoria:</label>
        <select
          name="category"
          value={newEntry.category}
          onChange={handleChange}
        ><option value="">Select a category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
        </select>

        <label>Concepto 1:</label>
        <input
          name="concept1"
          value={newEntry.concept1}
          onChange={handleChange}
          />

        <label>Concepto 2:</label>
        <input
          name="concept2"
          value={newEntry.concept2}
          onChange={handleChange}
          />

        {selectedEntry ? <button type="submit">Update</button> : ''}
        <button onClick={handleCreate}>Submit</button>
      </form>

      <h2>Submitted Data:</h2>
      {formData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Cuenta</th>
              <th>Categoria</th>
              <th>Concepto 1</th>
              <th>Concepto 2</th>
              <th></th>
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
                <td>{entry.concept2}</td>
                <td>
                  <button onClick={() => handleEdit(entry.id)}>Edit</button>
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
