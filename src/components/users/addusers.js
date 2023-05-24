import react from "react";
import './users.css';

export default function AddUser({onAdd}) {

    const handleOnSubmit = (event) => {
        event.preventDefault();
        onAdd(event.target.name.value, event.target.email.value, event.target.website.value);
        event.target.name.value = '';
        event.target.email.value = '';
        event.target.website.value = '';
    }

    return (
        <div className={'list'}>
            <form onSubmit={handleOnSubmit} className={'form'}>
                <h3>Adicionar Usuário</h3>
                <input placeholder={'Nome'} name={'name'} className={'input'}/>
                <input placeholder={'E-mail'} name={'email'} className={'input'}/>
                <input placeholder={'Website'} name={'website'} className={'input'}/>
                <button onSubmit={handleOnSubmit} className={'confirmbutton'}>Adicionar</button>
                <hr/>
            </form>
        </div>
    );
}