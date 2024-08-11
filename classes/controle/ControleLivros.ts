import { Livro } from '../modelo/Livro';

const livros: Array<Livro> = [
    new Livro(1, 1, 'Use a Cabeça: Java', 'Uma introdução ao Java.', ['Autor A', 'Autor B']),
    new Livro(2, 2, 'Java para Iniciantes', 'Aprenda Java desde o básico.', ['Autor C']),
    new Livro(3, 3, 'Java Avançado', 'Técnicas avançadas em Java.', ['Autor D'])
];

export class ControleLivros {
    obterLivros(): Array<Livro> {
        return livros;
    }

    incluir(livro: Livro): void {
        const novoCodigo = livros.length > 0 ? livros[livros.length - 1].codigo + 1 : 1;
        livro.codigo = novoCodigo;
        livros.push(livro);
    }

    excluir(codigo: number): void {
        const index = livros.findIndex(livro => livro.codigo === codigo);
        if (index >= 0) {
            livros.splice(index, 1);
        }
    }
}