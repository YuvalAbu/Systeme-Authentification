const React = require('react');
const {useState, useCallback} = require('react');

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [msg, setMsg] = useState();

  return (
    <div>
      <h1>Inscrivez vous</h1>
      <form action='/signup' method='post'>
        <div>
          <label htmlFor='emails'>Email : </label>
          <input
            name='email'
            type='text'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Mot de passe : </label>
          <input
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='text'
          />
        </div>
        <input type='submit' value="S'inscrire" />
      </form>
    </div>
  );
};

module.exports = Signup;
