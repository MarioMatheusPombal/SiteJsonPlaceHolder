import Navbar from "./utils/navbar/navbar";
import User from "./components/users/user";
import react, {useEffect} from "react";
import AddUser from "./components/users/addusers";
import './components/users/users.css'

function App() {
    const [users, setUsers] = react.useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => setUsers(json))
            .catch(error => console.log(error));
    };

    const onAdd = async (name, email, website) => {
        await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                website: website
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(json => setUsers([...users, json]))
            .catch(error => console.log(error));
    }

    const onEdit = async (id, name, email, website) => {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: name,
                email: email,
                website: website
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(json => setUsers(users.map(user => user.id === id ? json : user)))
            .catch(error => console.log(error));
    }

    const onRemove = async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(json => setUsers(users.filter(user => user.id !== id)))
            .catch(error => console.log(error));
    }

    const onSearch = async (name) => {
        await fetch(`https://jsonplaceholder.typicode.com/users?name=${name}`)
            .then(response => response.json())
            .then(json => setUsers(json))
            .catch(error => console.log(error));
    }


    return (
        <div>
            <Navbar/>
            <div>
                <h1 className={'h1'}>Lista de Usuários</h1>
                <AddUser onAdd={onAdd} onSearch={onSearch}/>
                {users.map(user => (
                    <User key={user.id} id={user.id} name={user.name} email={user.email} website={user.website}
                          onRemove={onRemove} onUpdate={onEdit}/>
                ))}
            </div>
        </div>
    );
}

export default App;
