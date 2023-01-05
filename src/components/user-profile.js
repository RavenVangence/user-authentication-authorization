import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {FaRegUserCircle} from 'react-icons/fa'; 

function UserProfile() {
    const dispatch = useDispatch();
    const {userProfileData} = useSelector(store => store.profileSlice);

    return <section className='main-profile-container'>
        
        {
            userProfileData.map((user) => {
                const {username, usernameID, roles} = user;

                return <div className='aside-user-container' key={usernameID}>
                    <FaRegUserCircle id='user-circle-icon'/>
                    <div className='username-container'>
                        <h3>{username}</h3>
                        <p>@{usernameID}</p>
                    </div>
                    <aside className='bio-container'>
                        <h3>Role</h3>
                        <p>- {roles.user && 'user'}</p>
                        <h3>Bio</h3>
                        <p>- </p>
                    </aside>
                </div>
            })
        }
        <nav>
            <ul>
                <li>My Posts</li>
                <li>Create Post</li>
            </ul>
        </nav>
    </section>
        
}

export default UserProfile;