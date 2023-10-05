import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getMoments from '@wasp/queries/getMoments';

export function Dashboard() {
  const { data: moments, isLoading, error } = useQuery(getMoments);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {moments.map((moment) => (
        <div
          key={moment.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{moment.description}</div>
          <div>{moment.rating}</div>
          <div>
            <Link
              to={`/moment/${moment.id}`}
              className='btn btn-primary btn-sm'
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}