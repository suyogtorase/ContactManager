import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Loader2, XCircle, Users, ArrowUpDown } from 'lucide-react';
import Card from './Card';

const ContactList = ({ refreshTrigger }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTrigger, setDeleteTrigger] = useState(0);
  const [isSorted, setIsSorted] = useState(false);

  const sortContactsAlphabetically = (contactsList) => {
    return [...contactsList].sort((a, b) => {
      const nameA = (a.name || '').toLowerCase();
      const nameB = (b.name || '').toLowerCase();
      return nameA.localeCompare(nameB);
    });
  };

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await axios.get('/api/get-contacts');

      if (data.success) {
        // Always use the list as provided by the function/API
        setContacts(data.contacts || []);
      } else {
        setError('Failed to fetch contacts');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Failed to fetch contacts');
      } else {
        setError('Network error. Please try again.');
      }
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [refreshTrigger, deleteTrigger]);

  const handleDelete = (deletedId) => {
    // Keep the original order, just remove the deleted contact
    setContacts(prevContacts => prevContacts.filter(contact => contact._id !== deletedId));
    setDeleteTrigger(prev => prev + 1);
  };

  const toggleSort = () => {
    setIsSorted(prev => !prev);
  };

  // Use memoized sorted list only when sorting is enabled
  const displayedContacts = useMemo(() => {
    if (isSorted) {
      return sortContactsAlphabetically(contacts);
    }
    return contacts;
  }, [contacts, isSorted]);


  if (loading) {
    return (
      <div className="bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10 border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-2">Contact List</h2>
        <p className="text-gray-400 mb-8">View all your saved contacts</p>
        <div className="text-center py-16">
          <Loader2 className="inline-block animate-spin h-12 w-12 text-blue-500" />
          <p className="mt-4 text-gray-300 font-medium">Loading contacts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10 border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-2">Contact List</h2>
        <p className="text-gray-400 mb-8">View all your saved contacts</p>
        <div className="bg-red-900/30 border-2 border-red-500/50 rounded-xl px-6 py-5">
          <div className="flex items-start gap-3">
            <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-300 font-semibold">{error}</p>
              <button
                onClick={fetchContacts}
                className="mt-3 text-sm text-red-400 font-medium hover:text-red-300 underline"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10 border border-gray-700">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Contact List</h2>
          <p className="text-gray-400">View all your saved contacts</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSort}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isSorted
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>{isSorted ? 'Sorted' : 'Sort A-Z'}</span>
          </button>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 px-5 py-2.5 rounded-xl border border-blue-700/50">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-bold text-lg">{contacts.length}</span>
            <span className="text-blue-400 font-medium">{contacts.length === 1 ? 'Contact' : 'Contacts'}</span>
          </div>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-700 rounded-full mb-6">
            <Users className="w-10 h-10 text-gray-500" />
          </div>
          <p className="text-xl font-semibold text-gray-200 mb-2">No contacts yet</p>
          <p className="text-gray-400">Start building your network by adding your first contact!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedContacts.map((contact) => (
            <Card key={contact._id} contact={contact} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;