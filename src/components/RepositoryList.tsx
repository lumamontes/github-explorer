import { useState, useEffect } from 'react';
import { RepositoryItem } from './RepositoryItem';

import '../styles/repositories.scss';

interface Repository {
    name: string;
    description: string;
    html_url: string;
    owner: {
        avatar_url: string;
        login: string
    }
}

interface Owner {
    login: string;
    avatar_url: string;
}


export function RepositoryList() {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [owner, setOwner] = useState<Owner>({login: '', avatar_url: ''});

    useEffect(() => {
        fetch('https://api.github.com/users/lumamontes/repos').
            then(response => response.json()
                .then(data => {
                    setRepositories(data)
                    setOwner(data[0].owner)
                }))
    }, [])
    return (
        <section className='repository-list'>
            <div>
                <h1>Lista de repositórios   -</h1><p> {owner.login} </p> <img src={owner.avatar_url} alt='Foto de usuário'></img>
            </div>
            <ul>
                {repositories.map(repositoy => <RepositoryItem key={repositoy.name} repository={repositoy} />)}
            </ul>
        </section>
    )
}
