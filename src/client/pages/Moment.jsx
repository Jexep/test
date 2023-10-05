import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getMoment from '@wasp/queries/getMoment';
import updateMoment from '@wasp/actions/updateMoment';

export function MomentPage() {
  const { momentId } = useParams();
  const { data: moment, isLoading, error } = useQuery(getMoment, { momentId });
  const updateMomentFn = useAction(updateMoment);
  const [newDescription, setNewDescription] = useState('');
  const [newRating, setNewRating] = useState(0);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateMoment = () => {
    updateMomentFn({ id: moment.id, description: newDescription, rating: newRating });
    setNewDescription('');
    setNewRating(0);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <p className="text-2xl font-bold">Moment: {moment.id}</p>
        <p className="mt-2">Description: {moment.description}</p>
        <p className="mt-2">Rating: {moment.rating}</p>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="New Description"
          className="px-1 py-2 border rounded text-lg"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="New Rating"
          className="px-1 py-2 border rounded text-lg"
          value={newRating}
          onChange={(e) => setNewRating(parseInt(e.target.value, 10))}
        />
        <button
          onClick={handleUpdateMoment}
          className="bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded"
        >
          Update Moment
        </button>
        <Link to="/dashboard" className="bg-gray-500 hover:bg-gray-700 px-2 py-2 text-white font-bold rounded ml-2">
          Go Back
        </Link>
      </div>
    </div>
  );
}