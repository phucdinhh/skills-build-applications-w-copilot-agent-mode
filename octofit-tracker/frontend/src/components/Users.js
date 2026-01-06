
import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-4">Users</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Team</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan="5" className="text-center">No users found.</td></tr>
              ) : (
                users.map((user, idx) => (
                  <tr key={user.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{user.username || user.name || '-'}</td>
                    <td>{user.email || '-'}</td>
                    <td>{user.team || '-'}</td>
                    <td><button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target={`#userModal${idx}`}>View</button>
                      {/* Modal */}
                      <div className="modal fade" id={`userModal${idx}`} tabIndex="-1" aria-labelledby={`userModalLabel${idx}`} aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id={`userModalLabel${idx}`}>User Details</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              <pre className="mb-0">{JSON.stringify(user, null, 2)}</pre>
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

export default Users;
