import React from "react";
// starpi function 
import loginUser from '../strapi/loginUser';
import registerUser from '../strapi/registerUser';

// handle user
import {useHistory} from 'react-router-dom';
import {UserContext} from '../context/user';

export default function Login() {

  const history = useHistory();

  // setup user contexts
  const {userLogin, alert, showAlert} = React.useContext(UserContext);
  

  // ****** state values
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('default');
  const [isMember, setIsMember] = React.useState(true);

  let isEmpty = !email || !password || !username || alert.show;

  const toggleMember = () => {
    setIsMember((prevMember) => {
      console.log(prevMember)
      let isMember = !prevMember
      isMember? setUsername('default') : setUsername('')
      return isMember
    })
  }

  const handleSubmit = async e => {

    // alert
    showAlert({msg: 'Accessing user data. Please wait ...'})
    e.preventDefault()
    let response;
    if(isMember) {
      response = await loginUser({email, password})
    } else {
      response = await registerUser({email, password, username})
    }

    if(response) {
      const {jwt: token, user:{username}} = response.data;
      const newUser = {token, username};
      userLogin(newUser);
      showAlert({msg: `You are logged in: ${username}. Shop away my friend!`, })
      history.push('/products')
    }
    else {
      // show alert danger
      showAlert({msg: 'There was an error. Please, try again', type: 'danger'})
    }

  }

  return  <section className="form section">
            <h2 className="section-title">{isMember? 'sign in' : 'register'}</h2>

            <form className="login-form">
                {/*  single imput     */}
                <div className="form-control">
                    <label htmlFor="email">email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                    >
                    </input>
                </div>
                {/*     end of single input  */}
                {/*     single imput     */}
                <div className="form-control">
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    >
                    </input>
                </div>
                {/*     end of single input      */}
                {/*      single imput     */}
                {!isMember && 
                <div className="form-control">
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      >
                    </input>
                </div>
                }
                {/*     end of single input  */}
                {/*     empty form text     */ }
                {isEmpty && <p className="form-empty">please fill out all the form fields</p>}
                {/*     submit button     */}
                {!isEmpty && <button 
                                type="submit" 
                                className="btn btn-block btn-primary"
                                onClick={handleSubmit}
                                >submit
                              </button>}
                {/* register link */}
                <p className="register-link">{isMember? 'need to register' : 'already a member'}
                <button type="button" onClick={toggleMember}>click here</button>
                </p>
            </form>
          </section>
};
