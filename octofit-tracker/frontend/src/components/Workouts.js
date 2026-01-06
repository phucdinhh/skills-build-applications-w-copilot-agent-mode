
import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-4">Workouts</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Workout</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr><td colSpan="5" className="text-center">No workouts found.</td></tr>
              ) : (
                workouts.map((workout, idx) => (
                  <tr key={workout.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{workout.name || workout.type || '-'}</td>
                    <td>{workout.date || '-'}</td>
                    <td>{workout.duration || '-'}</td>
                    <td><button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target={`#workoutModal${idx}`}>View</button>
                      {/* Modal */}
                      <div className="modal fade" id={`workoutModal${idx}`} tabIndex="-1" aria-labelledby={`workoutModalLabel${idx}`} aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id={`workoutModalLabel${idx}`}>Workout Details</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              <pre className="mb-0">{JSON.stringify(workout, null, 2)}</pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
