import { useEffect, useState } from 'react'
import './App.css'

export default function App() {

  // 7. On crée l'état grace au hook useState où on save l'état de la variable user qui est un objet vide par défault
  const [user, setUser] = useState({});

  const [listeUsers, setListeUsers] = useState([]);

  // 2. On a créer une function getData qui va récupérer les valeurs des inputs

  // Function qui récupére une liste de users
  function getUsers() {
    // On cherche les données qui sont dans ce lien
    fetch('https://jsonplaceholder.typicode.com/users')
      // Aprés avoir récupérer la donnée, convertis les en format JSON
      .then(response => response.json())
      // Aprés la converssion, store les données dans le hook listeUsers
      .then(data => setListeUsers(data))
  }

  function getData(event) {
    // 4. On utilise le event.preventDefault() pour éviter l'actualisation de la page et le comportement par défaut de l'event
    event.preventDefault();

    // 5. On récupére les valeurs des inputs grace au event.target.attributnamedelinput
    var name = event.target.name.value
    var age = event.target.age.value
    var email = event.target.email.value
    var pwd = event.target.pwd.value

    // 6. On check que tout les champs sont remplies
    if (name == "" || age == "" || email == "" || pwd == "") {
      alert('tu dois remplir tout les champpsp')
    } else {
      // 10. On check si le mot de passe est plus petit que 6
      if (pwd.length < 6) {
        alert('Le mot de passe doit être plus grand que 6')
      } else {
        // 8. On change la valeur de la variable user par les nouvelles valeurs entré par l'utilisateur
        const newUser = {
          name: name,
          age: age,
          email: email,
          pwd: pwd
        }
        setUser(newUser)
      }
    }


  }

  useEffect(() => {
    getUsers()
  }, []);
  return (
    <div className="App">
      {listeUsers.map(e => {
        return <div>
          <h1>Name: {e.name}</h1>
          <h3>Username : {e.username}</h3>
          <h3>City : {e.address.city}</h3>
        </div>
      })}
      {/* 9. On affiche l'objet user dans le HTML */}
      <div>
        <h1>{user.name}</h1>
        <h1>{user.age}</h1>
        <h1>{user.email}</h1>
      </div>

      {/* 1. On a commencé par créer un formulaire */}
      {/* 3. On a lier la function avec le form avec un event onSubmit */}
      <form onSubmit={getData}>
        <div>
          <label>Name</label>
          <input name='name' type="text" placeholder='name' />
        </div>
        <div>
          <label>Age</label>
          <input name='age' type="number" placeholder='age' />
        </div>
        <div>
          <label>email</label>
          <input name='email' type="text" placeholder='email' />
        </div>
        <div>
          <label>password</label>
          <input name='pwd' type="password" placeholder='password' />
        </div>
        <button type='submit'>Add User</button>
      </form>

    </div>
  )
}