import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"; // Importa a função para conectar ao banco de dados

// Conecta ao banco de dados usando a string de conexão do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    // Seleciona o banco de dados "imersão-instabytes"
    const db = conexao.db("imersão-instabytes");
    // Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    // Busca todos os documentos da coleção e retorna como um array
    return colecao.find().toArray();
};

export async function criarPost(novoPost) {
    // Conecta ao banco de dados "imersão-instabytes" e seleciona a coleção "posts"
    const db = conexao.db("imersão-instabytes");
    // Insere um novo documento (post) na coleção "posts"
    const colecao = db.collection("posts");
    // Retorna um objeto com informações sobre a inserção, incluindo o ID do novo documento
    return colecao.insertOne(novoPost);
  };

export async function atualizarPost(id, novoPost) {
    // Conecta ao banco de dados "imersão-instabytes" e seleciona a coleção "posts"
    const db = conexao.db("imersão-instabytes");
    // Insere um novo documento (post) na coleção "posts"
    const colecao = db.collection("posts");
    // pegar a ID recebida de um objeto e enviar para o mongoDB de uma forma que ele entenda
    const objID = ObjectId.createFromHexString(id);
    // funçao updateOne utilizada para modificar um objeto e sua forma de escrita especificada pelo documento do mongoDB
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
  }