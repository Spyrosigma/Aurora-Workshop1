"use client";
import { useState } from 'react';
import { updateUser } from '../app/utils';

export default function UpdateUserForm() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [favNumber, setFavNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const tx = await updateUser(userId, name, favNumber);
      console.log("Transaction submitted:", tx);
      setSuccess('User updated successfully!');
    } catch (err) {
      console.error("Error updating user:", err);
      setError('Failed to update user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mt-6 max-w-md mx-auto border border-black rounded-lg overflow-hidden bg-white text-black">
      <div className="p-4 border-b border-black">
        <h2 className="text-2xl font-bold">updateUser</h2>
      </div>
      <form className="p-4" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-black mb-1">
              ID
            </label>
            <input
              id="id"
              type="text"
              placeholder="enter ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
          </div>
          <div>
            <label htmlFor="favNumber" className="block text-sm font-medium text-black mb-1">
              Fav Number
            </label>
            <input
              id="favNumber"
              type="number"
              placeholder="favNumber"
              value={favNumber}
              onChange={(e) => setFavNumber(e.target.value)}
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
          </div>
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {success && <p className="mt-4 text-green-500">{success}</p>}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update User'}
          </button>
        </div>
      </form>
    </div>
  );
}