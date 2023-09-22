import express from "express";
import cors from "cors";
import { executeQuery } from "./config/database.js";

const app = express();

//json
app.use(express.json());

//cors
app.use(cors())

//Rota
app.get("/professor", function(req, res) { 

  let ssql = "select ven_id id, col_nome nome from colaborador, vendedor where colaborador.col_id = vendedor.col_id";

    executeQuery(ssql, function(err,result){
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
});

app.listen(3000,function() {
        console.log("servidor no ar")
      });