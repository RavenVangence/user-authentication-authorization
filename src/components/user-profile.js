import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {FaRegUserCircle, FaRegComment} from 'react-icons/fa';
import {RiDislikeLine, RiHeartLine, RiShareLine} from 'react-icons/ri'
import { setPostData, submitPost, setIsPostingOff, setIsPostingOn } from '../controllers/profile-data-slice';
import { TiTick } from 'react-icons/ti';
function UserProfile() {
    const dispatch = useDispatch();
    const {userProfileData, userPosts, isPosting, postData, postError, isLoading, isPostSubmitComplete} = useSelector(store => store.profileSlice);

    return <section className='main-profile-container'>
        
        {
            userProfileData.map((user) => {
                const {username, usernameID} = user;

                return <div className='aside-user-container' key={usernameID}>
                    
                    <div className='username-container'>
                        <FaRegUserCircle id='user-circle-icon'/>
                        <h3>{username}</h3>
                        <p>@<span id='usernameID-grey'>{usernameID}</span></p>
                    </div>
                    <aside className='bio-container'>
                        <h3>Bio</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem impedit rerum nostrum reprehenderit explicabo quos minus adipisci? Accusantium fuga, necessitatibus nobis illo exercitationem aut! Itaque iste ducimus magnam impedit nesciunt? </p>
                        <h3>Friends</h3>
                        <p>213</p>
                    </aside>
                </div>
            })
        }
        <section className='post-menu-container'>
            <nav className='post-nav-container'>
                <button onClick={() => dispatch(setIsPostingOff())} className={!isPosting && 'hold'}>My Posts</button> 
                <button onClick={() => dispatch(setIsPostingOn())} className={isPosting && 'hold'}>Create Post</button>
            </nav>

            {isPosting ?  
            
            isLoading ?
            <div className='home-loader-container' id='posting-loader'>
                <div id='home-loader'>

                </div>

                <h3>Please Wait . . .</h3>
            </div> 
            
            :
            
            isPostSubmitComplete ? <HomeModal/> :
                <div className='posting-container'>
                    {postError[0] && <p className='post-error'> {postError[1]}</p>}
                    <form>
                        <div className='form-control'>
                            <textarea 
                                name='message'  
                                id='message'
                                required={true}
                                value={postData.message}
                                onChange={(e) => dispatch(setPostData({ name: e.target.name, value: e.target.value}))}
                            />
                            <label htmlFor="message" className='textarea-label'>Share Your Thoughts</label>
                        </div>
                    </form>
                    <button className='post-btn' onClick={() => dispatch(submitPost())}><h3>Post</h3></button>
                </div> :

                <div className='posts-container'>
                    {
                        userPosts[0] ? userPosts.map((post) => {
                            const {usernameID, username, _id} = userProfileData[0]
                            const {message} = post;

                            return <div className='ind-post-container' key={_id}>
                                <div className='post-author-section'>
                                    <FaRegUserCircle id='post-user-icon'/>
                                    <div>
                                        <h4>{username}</h4>
                                        <p>@<span>{usernameID}</span></p>
                                    </div>
                                    
                                </div>
                                <div className='post-message'>
                                    {message}
                                </div>
                                <div className='post-footer'>
                                    <div><RiHeartLine className='post-footer-icon'/></div>
                                    <div><RiDislikeLine className='post-footer-icon'/></div>
                                    <div><FaRegComment className='post-footer-icon'/></div>
                                    <div><RiShareLine className='post-footer-icon'/></div>
                                </div>
                            </div>
                        })  : <aside className='no-post-container'>
                            <h4>You have not yet posted</h4>
                            <p>your posts will appear here once you post</p>
                        </aside>
                    }
                </div>
            }
        </section>
    </section>
}



const HomeModal = () => {

  return <>
    <div className='home-modal-container'>
      <h3>Post complete successfully</h3>
      <TiTick id='tick'></TiTick>
      <h4>Redirecting to your posts</h4>
      <div id='home-modal-loader'></div>
    </div>
  </>
}

export default UserProfile;