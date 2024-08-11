import { Livro } from '../modelo/Livro';

const livros: Array<Livro> = [
    new Livro(1, 1, 'Livro A', 'Resumo A', ['Autor 1']),
    new Livro(2, 2, 'Livro B', 'Resumo B', ['Autor 2']),
    new Livro(3, 3, 'Livro C', 'Resumo C', ['Autor 3'])
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