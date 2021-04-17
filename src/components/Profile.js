import React from 'react'

function Profile() {
    return (
        <div>
            <h1>Account Settings</h1>
            <form className="">
            <label >
              Email:
            </label>
            <input
              type="email"
              name="userEmail"
              id="userEmail"
            />
            <br/>
            <label>
              Password:
            </label>
            <input
              type="password"
              name="userPassword"
              id="userPassword"
            />
            <br/>
            <label>
              Email:
            </label>
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              disabled={true}
            />
            <br/>
            <label>
              Description:
            </label>
            <input
              type="description"
              name="userDescription"
              id="userDescription"
            />
          </form>
        </div>
    )
}

export default Profile
