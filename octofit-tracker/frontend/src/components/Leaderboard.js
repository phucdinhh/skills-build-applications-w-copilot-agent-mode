
import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-4">Leaderboard</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Score</th>
                <th>Team</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {leaders.length === 0 ? (
                <tr><td colSpan="5" className="text-center">No leaderboard data.</td></tr>
              ) : (
                leaders.map((leader, idx) => (
                  <tr key={leader.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{leader.name || leader.username || '-'}</td>
                    <td>{leader.score || leader.points || '-'}</td>
                    <td>{leader.team || '-'}</td>
                    <td><button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target={`#leaderModal${idx}`}>View</button>
                      {/* Modal */}
                      <div className="modal fade" id={`leaderModal${idx}`} tabIndex="-1" aria-labelledby={`leaderModalLabel${idx}`} aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id={`leaderModalLabel${idx}`}>Leader Details</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              <pre className="mb-0">{JSON.stringify(leader, null, 2)}</pre>
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

export default Leaderboard;
