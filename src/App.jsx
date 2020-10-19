import React, { useState , useEffect} from 'react'
import Post from './Post'
import {db,auth} from './firebase'
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Avatar, Button,IconButton,Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

function getModalStyle() {
    const top = 50 
    const left = 50 
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  

function App() {
    const classes=useStyles();
    const [modalStyle] = useState(getModalStyle);
    
    const [posts,setPosts] = useState([ ]);
    const [openSignIn,setOpenSignIn]=useState(false);
    const [open,setOpen] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [username,setUsername] = useState('');
    const [user,setUser] = useState(null);

    useEffect(() => {
        const unsubscribe=auth.onAuthStateChanged((authUser) => {
            if(authUser){
                //user has logged in
                console.log(authUser)
                setUser(authUser)
            }else{
                //user has logged out
                setUser(null)
            }
        })
        return () => {
            unsubscribe();
        }
    },[user,username]);

    useEffect(() => {
       db.collection('posts')
       .orderBy('timestamp','desc')
       .onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id:doc.id,
                post:doc.data()
                 
            })));
       })
    }, []);

    const signUp = (event) => {
        event.preventDefault();

        auth.createUserWithEmailAndPassword(email,password)
        .then((authUser) =>{
            return authUser.user.updateProfile({
                displayName:username
            })
        })
        .catch((error) => alert(error.message));
        setOpen(false);
    }

    const signIn = (event) =>{
        event.preventDefault();

        auth
        .signInWithEmailAndPassword(email,password)
        .catch((error) => alert(error.message));

        setOpenSignIn(false);
    }

    return (
        <div className="app">
           <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className='app__signup'>
                        <center>
                            <img
                                 className="app__headerImage"
                                 src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                 alt=""
                            />
                          </center>
                            <Input 
                                placeholder="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='app__username'
                            />
                            <Input 
                                placeholder="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='app__email'
                            />
                            <Input 
                                placeholder="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='app__password'
                            />
                        <Button type="submit" onClick={signUp}>sign up</Button>
                    </form>
              
                </div>
            </Modal>

            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className='app__signup'>
                        <center>
                            <img
                                className="app__headerImage"
                                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                alt=""
                            />
                        </center>
                        
                        <Input 
                            placeholder="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='app__email'
                        />
                        <Input 
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='app__password'
                        />
                        <Button type="submit" onClick={signIn}>sign In</Button>
                    </form>
                </div>
            </Modal>

       
            <div className="app__header">
                <img
                    className="app__headerImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt=""
                />
                <div className="app__icons">
                    <IconButton>
                        <HomeIcon />
                    </IconButton>
                    <IconButton>
                         <SendIcon />
                    </IconButton>
                    <IconButton>
                        <ExploreIcon />
                    </IconButton>
                    <IconButton>
                        <FavoriteBorderIcon />
                    </IconButton>
                 </div>
                
                 {
                     user ?(
                        <Button onClick={() => auth.signOut()}>Logout</Button>
                    ):(
                        <div className='app__loginContainer'>
                        <Button className='app__signIn' onClick={() => setOpenSignIn(true)}>sign In</Button>
                        <Button className='app__signUp' onClick={() => setOpen(true)}>sign Up</Button>
                        </div>
                      )
                }
            </div>
               
            <div className='app__posts'>
                <div className='app__postsLeft'>
                        {
                            posts.map(({id,post}) =>(
                            
                                <Post 
                                    key={id}
                                    postId={id}
                                    user={user}
                                    username={post.username}
                                    imageUrl={post.imageUrl}
                                    caption={post.caption}
                                
                                />
                            ))
                        }
                </div>
                <div className='app__postsRight'>
                        <InstagramEmbed 
                            url='https://www.instagram.com/p/CCu4kUlH1qe/'
                            maxWidth={320}
                            hideCaption={false}
                            containerTagName='div'
                            protocol=''
                            injectScript
                            onLoading={()=>{}}
                            onSuccess={()=>{}}
                            onAfterRender={()=>{}}
                            onFailure={()=>{}}
                        />
                        <InstagramEmbed 
                            url='https://www.instagram.com/p/CCxaEZ2nAHj/'
                            maxWidth={320}
                            hideCaption={false}
                            containerTagName='div'
                            protocol=''
                            injectScript
                            onLoading={()=>{}}
                            onSuccess={()=>{}}
                            onAfterRender={()=>{}}
                            onFailure={()=>{}}
                        />
                        <InstagramEmbed 
                            url='https://www.instagram.com/p/Bvd-PxCHdHH/'
                            maxWidth={320}
                            hideCaption={false}
                            containerTagName='div'
                            protocol=''
                            injectScript
                            onLoading={()=>{}}
                            onSuccess={()=>{}}
                            onAfterRender={()=>{}}
                            onFailure={()=>{}}
                        />
                </div>
             
            </div>
                
           

            {user?.displayName ? (
                <ImageUpload 
                username={user.displayName}
            />
            ):(
                <h3>Sorry you need to login to upload the Image </h3>
                )}

        </div>
    );
}

export default App
