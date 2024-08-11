import React, {useEffect, useState} from 'react';
import type {NextPage} from 'next';
import Head from 'next/head';
import {LinhaLivro} from '@/componentes/LinhaLivro';
import styles from '../styles/Home.module.css';
import {Menu} from '@/componentes/Menu';
import {Livro} from '@/classes/modelo/Livro';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseURL = "http://localhost:3000/api/livros";

const LivroLista: NextPage = () => {
    const [livros, setLivros] = useState<Array<Livro>>([]);
    const [carregado, setCarregado] = useState(false);

    const obterLivros = async () => {
        const resposta = await fetch(baseURL);
        return await resposta.json();
    };

    const excluirLivro = async (codigo: number) => {
        const resposta = await fetch(`${baseURL}/${codigo}`, {
            method: 'DELETE',
        });
        return resposta.ok;
    };

    useEffect(() => {
        if (!carregado) {
            obterLivros().then((livros) => {
                setLivros(livros);
                setCarregado(true);
            });
        }
    }, [carregado]);

    const excluir = (codigo: number) => {
        excluirLivro(codigo).then((sucesso) => {
            if (sucesso) {
                setCarregado(false);
            }
        });
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Catálogo de Livros</title>
                <meta name="description" content="Lista de livros da loja Next" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Menu />

            <main className={`${styles.main} py-4`} style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                <div className="container">
                    <h1 className="text-center my-4" style={{ color: '#343a40' }}>Catálogo de Livros</h1>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead className="thead-dark">
                            <tr>
                                <th>Título</th>
                                <th>Resumo</th>
                                <th>Editora</th>
                                <th>Autores</th>
                                <th>Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {livros.map((livro) => (
                                <LinhaLivro key={livro.codigo} livro={livro} excluir={() => excluir(livro.codigo)} />
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LivroLista;