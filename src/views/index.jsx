const React = require('react');
const {useState} = require('react');

const Index = props => {
  console.log(props.cookie);

  if (props.cookie) {
    if (props.cookie.user.email === 'admin') {
      props.cookie.user.users.map((value, index) => {
        console.log(value.email);
      });

      return (
        <div>
          <h1>Vous êtes Admin</h1>
          <a href='/logout'>Déconnectez vous</a>

          <table style={{"text-align": "center", "width": "80%", "border" : "1px solid #000" }}>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Email</th>
              <th scope='col'>Password</th>
            </tr>
            <tr>
              {props.cookie.user.users.map(function(object, i) {
                return (
                  <div>
                    <td>{object._id}</td>
                    <td>{object.email}</td>
                    <td>{object.password}</td>
                  </div>
                );
              })}
            </tr>
          </table>
        </div>
      );
    }
    return (
      <div>
        <h1>Bonjour {props.cookie.user[0].email}</h1>
        <h2>Vous êtes connectez</h2>

        <a href='/logout'>Déconnectez vous</a>
      </div>
    );
  } else
    return (
      <div>
        <h1>Hello Ici</h1>

        <a href='/signup'>Inscrivez vous </a>
        <a href='/signin'>Connectez vous</a>
      </div>
    );
};

module.exports = Index;
