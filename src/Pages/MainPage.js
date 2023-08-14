import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import TokenContext from '../Context/TokenContext';
import { useNavigate } from 'react-router-dom';

  
function MainPage({setLogged}) {
  const [chosenUsers, setChosenUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const {token,setToken,curUser,setCurUser} = useContext(TokenContext);
  const navigate = useNavigate()
 

  const getCurUser = (id)=>{
    axios.get('https://blocking.somee.com/api/auth/getCur',{params:{id:id}})
    .then((response) => {
      console.log(response);
      if(response.status==200){
        console.log("BLOCKED:",response.data.blocked)
        console.log("TOKEN",response.data.token)
        setToken(response.data.token)
      }else if(response.data == "ERROR"){
        console.log("IN PROPER");
        setToken("")
        setLogged(false);
      }
    })
    .catch((error) => setToken(""));
  }

  const fetchUserTableData = () => {
    axios
      .get('https://blocking.somee.com/api/table/getAll', {
        headers: { "Authorization": `Bearer ${token}` }
      })
      .then((response) => {
        
        setUsers(response.data.sort((a, b) => a.id - b.id));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
      fetchUserTableData();
  },[]);

  const handleCheckboxChange = (id) => {
    if (chosenUsers.includes(id)) {
      setChosenUsers(chosenUsers.filter((user) => user !== id));
    } else {
      setChosenUsers([...chosenUsers, id]);
    }
  };
  const handleToolboxAction = (action) => {
    

    if (action === 'delete') {
      axios.delete('https://blocking.somee.com/api/table/delete', {
  data: chosenUsers,
  headers: { "Authorization": `Bearer ${token}` }
}).then((response)=>
{if(chosenUsers.includes(curUser)){
  setLogged(false)
  navigate("/login");
}
    }).catch((error) => {
    console.log(error);
  });
    } else if (action === 'block') {
      axios.put('https://blocking.somee.com/api/table/update', {
        ids: chosenUsers,
        blocked: true,
      },{headers:{"Authorization":`Bearer ${token}`}}).then((response) => {
        if(chosenUsers.includes(curUser)){
          setLogged(false)
          navigate("/login");
        }
        ;
      })
    } else if (action === 'unblock') {
      axios.put('https://blocking.somee.com/api/table/update', {
        ids: chosenUsers,
        blocked: false,
      },{headers:{"Authorization":`Bearer ${token}`}}).then((response) => {
        }).catch((error) => console.log(error));
    }
    fetchUserTableData()
    getCurUser(curUser);
  };

  return (
    <div className="container mt-5">
      {token!="" ? (
        <>
          <h2>User Management</h2>
          <div className="toolbox d-flex justify-content-end mb-3">
            <button
              className="btn btn-danger me-2"
              onClick={() => handleToolboxAction('delete')}
            >
              Delete
            </button>
            <button
              className="btn btn-warning me-2"
              onClick={() => handleToolboxAction('block')}
            >
              Block
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleToolboxAction('unblock')}
            >
              Unblock
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Login Date</th>

                <th>Register Date</th>
                <th>Blocked</th>
                <th><label f></label>
                <input
                    type="checkbox"
                    checked={chosenUsers.length === users.length}
                    onChange={() => {
                      if (chosenUsers.length === users.length) {
                        setChosenUsers([]);
                      } else {
                        setChosenUsers(users.map((user) => user.id));
                      }
                    }}
                  /></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.username}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.lastLogin}</td>
                  <td>{user.registrationTime}</td>
                  <td>{user.blocked?"Yes":"No"}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={chosenUsers.includes(user.id)}
                      onChange={() => handleCheckboxChange(user.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Login to see user management</p>
      )}
    </div>

  );
}

export default MainPage;