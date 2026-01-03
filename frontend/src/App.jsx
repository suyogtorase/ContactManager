import { useState } from 'react';
import { Users, Plus, List } from 'lucide-react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

const App = () => {
  const [activeView, setActiveView] = useState('form');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleContactAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/50">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-3 pb-2">
            Contact Manager
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Keep your connections organized and accessible
          </p>
        </header>

        {/* View Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-1.5">
            <button
              onClick={() => setActiveView('form')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeView === 'form'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Contact
              </span>
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeView === 'list'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <List className="w-5 h-5" />
                View Contacts
              </span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          {activeView === 'form' ? (
            <ContactForm onContactAdded={handleContactAdded} />
          ) : (
            <ContactList refreshTrigger={refreshTrigger} />
          )}
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm mt-12">
          <p className="flex items-center justify-center gap-2">
            <span>Built with</span>
            <span className="text-red-400">♥</span>
            <span>using React • Node.js • Express • MongoDB</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;