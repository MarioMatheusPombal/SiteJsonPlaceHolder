import react from "react";
import './users.css';

export default function User({id, name, email, website, onRemove, onUpdate}) {
    const [isEditing, setIsEditing] = react.useState(false);

    const handleOnRemove = () => {
        onRemove(id);
    }

    const handleOnUpdate = () => {
        setIsEditing(!isEditing);
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        onUpdate(id, event.target.name.value, event.target.email.value, event.target.website.value);
        setIsEditing(!isEditing);
    }

    return (
        <div className={'list'}>
            {isEditing ? (
                <form onSubmit={handleOnSubmit}>
                    <input placeholder={'Nome'} name={'name'} defaultValue={name} className={'input'}/>
                    <input placeholder={'E-mail'} name={'email'} defaultValue={email} className={'input'}/>
                    <input placeholder={'Website'} name={'website'} defaultValue={website} className={'input'}/>
                    <button className={'confirmbutton'}>Atualizar</button>
                    <button onClick={handleOnUpdate} className={'cancelbutton'}>Cancelar</button>
                </form>
            ) : (
                <div>
                    <h3>{name}</h3>
                    <p>{email}</p>
                    <p>{website}</p>
                    <button onClick={handleOnRemove} className={'cancelbutton'}>Remover</button>
                    <button onClick={handleOnUpdate} className={'editbutton'}>Editar</button>
                    <hr/>
                </div>
            )}
        </div>
    );
}