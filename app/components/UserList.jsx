"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (name && email) {
      try {
        const response = await axios.post('http://localhost:8000/users', { name, email });
        setUsers([...users, response.data]);
        setName('');
        setEmail('');
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/users/${userId}`);
      fetchUsers(); 
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">User List</h2>
          <form onSubmit={handleAddUser} className="p-4 border rounded bg-light">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Add User</button>
            </div>
          </form>
        </div>
      </div>
      {users.length > 0 && (
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className='deletebtn'>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;