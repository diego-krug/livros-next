import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Menu } from '@/componentes/Menu';
import { useRouter } from 'next/router';
import { Livro } from '@/classes/modelo/Livro';
import { ControleEditora } from '@/classes/controle/ControleEditora';

const controleEditora = new ControleEditora();
const baseURL = "http://localhost:3000/api/livros";

const LivroDados: NextPage = () => {
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(controleEditora.getEditoras()[0].codEditora);
    const router = useRouter();

    const incluirLivro = async (livro: Livro) => {
        const resposta = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(livro),
        });
        return resposta.ok;
    };

    const tratarCombo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(evento.target.value));
    };

    const incluir = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        const livro: Livro = {
            codigo: 0,
            titulo: titulo,
            resumo: resumo,
            autores: autores.split('\n'),
            codEditora: codEditora,
        };
        incluirLivro(livro).then((sucesso) => {
            if (sucesso) {
                router.push('/LivroLista');
            }
        });
    };

    const opcoes = controleEditora.getEditoras().map(editora => ({
        value: editora.codEditora,
        text: editora.nome,
    }));

    return (
        <div className={styles.container}>
            <Head>
                <title>Dados do Livro</title>
                <meta name="description" content="Adicione um novo livro à loja Next" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Menu />

            <main className={`${styles.main} py-4`} style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                <div className="container">
                    <h1 className="text-center my-4" style={{ color: '#343a40' }}>Dados do Livro</h1>
                    <form onSubmit={incluir}>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: '#495057' }}>Título</label>
                            <input
                                type="text"
                                className="form-control"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: '#495057' }}>Resumo</label>
                            <textarea
                                className="form-control"
                                value={resumo}
                                onChange={(e) => setResumo(e.target.value)}
                                rows={3}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: '#495057' }}>Editora</label>
                            <select
                                className="form-select form-control"
                                value={codEditora}
                                onChange={tratarCombo}
                            >
                                {opcoes.map((editora, index) => (
                                    <option key={index} value={editora.value}>
                                        {editora.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: '#495057' }}>Autores (1 por linha)</label>
                            <textarea
                                className="form-control"
                                value={autores}
                                onChange={(e) => setAutores(e.target.value)}
                                rows={3}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Salvar Dados</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default LivroDados;