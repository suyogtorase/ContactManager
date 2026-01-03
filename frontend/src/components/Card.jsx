import React, { useState } from 'react';
import { Calendar, Mail, Phone, Trash2, Loader2, AlertTriangle, X } from 'lucide-react';
import axios from 'axios';

const Card = ({ contact, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPhone = (phone) => {
    if (!phone) return 'N/A';
    const cleaned = phone.replace(/\D/g, '');
    return cleaned || phone;
  };

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
    setErrorMessage('');
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setShowConfirmModal(false);
    
    try {
      const { data } = await axios.delete(`http://localhost:5000/api/delete-contact/${contact._id}`);
      
      if (data.success) {
        if (onDelete) {
          onDelete(contact._id);
        }
      } else {
        setErrorMessage(data.error || 'Failed to delete contact');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || 'Failed to delete contact');
      } else {
        setErrorMessage('Network error. Please try again.');
      }
      console.error('Error deleting contact:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setErrorMessage('');
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-700 border-2 border-gray-600 rounded-xl p-5 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center gap-5">
        {/* Avatar and Name */}
        <div className="flex items-center gap-4 md:w-64 flex-shrink-0">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md shadow-blue-500/50 flex-shrink-0">
            {contact.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-lg truncate">{contact.name}</h3>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3 h-3" />
              {formatDate(contact.createdAt)}
            </p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Email</label>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="truncate text-sm">{contact.email}</span>
            </a>
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Phone</label>
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{formatPhone(contact.phone)}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Message - Full Width Below */}
      {contact.message && (
        <div className="mt-4 pt-4 border-t border-gray-600">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Message</label>
          <p className="text-sm text-gray-300 leading-relaxed">
            {contact.message}
          </p>
        </div>
      )}

      {/* Delete Button */}
      <div className="mt-4 pt-4 border-t border-gray-600 flex justify-end">
        <button
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-red-600/30"
        >
          {isDeleting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Deleting...</span>
            </>
          ) : (
            <>
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-300">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage('')}
              className="mt-2 text-xs text-red-400 hover:text-red-300 underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Delete Contact</h3>
                <p className="text-gray-300 mb-1">
                  Are you sure you want to delete <span className="font-semibold text-white">{contact.name}</span>?
                </p>
                <p className="text-sm text-gray-400">
                  This action cannot be undone.
                </p>
              </div>
              <button
                onClick={handleCancelDelete}
                className="flex-shrink-0 text-gray-400 hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;

