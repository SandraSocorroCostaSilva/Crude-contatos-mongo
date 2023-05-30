require("dotenv").config();
const express = require("express");
const { initDatabase } = require("./db");
const { ObjectId } = require("mongodb")

const app = express();

app.use(express.json());

let collection;
initDatabase().then((col) => {
    collection = col;
});

app.get("/", (req, res) => {
    res.send("Seja bem vindo à nossa agenda MongoDB!");
});

app.get("/agenda", async (req, res) => {
    const agenda = await collection.find().toArray();
    res.send(agenda);
});

app.get("/agenda/:id", async (req, res) => {
    const agenda = await collection.findOne({_id: new ObjectId (req.params.id) });
    res.send(agenda);
});

app.post("/agenda", async (req, res) => {
    const { nome, telefone, aniversario } = req.body; //extrai atributo nome e telefone
    const agenda = { nome, telefone, aniversario }; //cria o objeto com os atributos nome e telefone
    await collection.insertOne(agenda);
    res.send(agenda);
});

app.put("/agenda/:id", async (req, res) => {
    const { nome, telefone, aniversario } = req.body; //extrai atributo nome e telefone
    const agenda = { nome, telefone, aniversario }; //cria o objeto com os atributos nome e telefone
    await collection.updateOne({_id: new ObjectId (req.params.id) }, {$set: agenda});
    res.send(agenda);
});

app.delete("/agenda/:id", async (req, res) => {
    await collection.deleteOne({_id: new ObjectId (req.params.id) });
    res.send({message: "Agenda removida com sucesso"});
});

const port  = process.env.APP_PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});