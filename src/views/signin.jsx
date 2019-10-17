const React = require('react');
const {useState, useEffect} = require('react');

const Signin = props => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [msg, setMsg] = useState();

  console.log(props)
  console.log(props._locals)

  return (
    <div>
      <h1>Connecter vous :) </h1>
      <form action='/signin' method='post'>
        <div>
          <label htmlFor='emails'>Username or Email: </label>
          <br />
          <input name='username' type='text' />
        </div>
        <div>
          <label htmlFor='emails'>Mot de passe : </label>
          <br />
          <input name='password' type='text' />
        </div>

        <input type='submit' value='connectez vous' />
      </form>
    </div>
  );
};

module.exports = Signin;
