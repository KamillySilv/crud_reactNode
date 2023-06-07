const oracledb = require('oracledb');

exports.list = async (req, res, nxt) => {

	// Get a connection from the default pool
	let conn;
	try {
		conn = await oracledb.getConnection();
		
			
		let sql = 
		`SELECT *
		FROM DIEGO.ESTOQUE WHERE STATUS = 1`;
		const colab = await conn.execute(sql);

		if (!colab?.rows.length)
			return res.sendStatus(403);
		
	
		res.status(200).json(colab.rows);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	} finally {
		if(conn)
			await conn.close();
	}
}
exports.create = async (req, res, nxt) => {
	console.log(req.body);
	// verifica se o body não está vazio
	if (!req.body?.nome || !req.body?.qtd || !req.body?.preco)
		return res.status(400).json({msg: "Solicitacao mal formada ou sem corpo"});

	// Get a connection from the default pool
	let conn;
	try {
		conn = await oracledb.getConnection();
		
		let sql = 
		`MERGE INTO ESTOQUE
		USING DUAL
        ON (NOME_PROD = :nome)
		WHEN MATCHED
		THEN UPDATE SET STATUS = 1, QUANTIDADE = :qtd, PRECO = :preco
		WHEN NOT MATCHED
		THEN INSERT (NOME_PROD, QUANTIDADE, PRECO) VALUES(:nome, :qtd, :preco)`;
		const colab = await conn.execute(sql, {nome: req.body.nome, qtd: req.body.qtd, preco: req.body.preco});
		
		if (!colab?.rowsAffected)
			return res.sendStatus(412);
		
		conn.commit();
		res.sendStatus(201);
	} catch (err) {
			console.log(err)
			res.status(500).json(err)
	} finally {
		if(conn)
			await conn.close();
	}
}
exports.delete = async (req, res, nxt) => {
	console.log(req.params);
	// verifica se o body não está vazio
	if (!req.params?.id)
		return res.status(400).json({msg: "Solicitacao mal formada ou sem corpo"});

	// Get a connection from the default pool
	let conn;
	try {
		conn = await oracledb.getConnection();
		
		const sql = `UPDATE ESTOQUE SET STATUS = 9 WHERE ID = :0`;
		conn.execute(sql, [req.params.id])
		
		conn.commit();
		res.sendStatus(204);
	} catch (err) {
			console.log(err)
			res.status(500).json(err)
	} finally {
		if(conn)
			await conn.close();
	}
}

exports.item = async(req, res, nxt) => {
	console.log(req.params);
	// verifica se o body não está vazio
	if (!req.params?.id)
		return res.status(400).json({msg: "Solicitacao mal formada ou sem corpo"});

	// Get a connection from the default pool
	let conn;
	try {
		conn = await oracledb.getConnection();
		
		const sql = `SELECT * FROM ESTOQUE WHERE ID = :0`;
		const item = await conn.execute(sql, [req.params.id])
	if (!item.rows.length)
		return sendStatus(204);

		res.status(200).json(item.rows);
	} catch (err) {
			console.log(err)
			res.status(500).json(err)
	} finally {
		if(conn)
			await conn.close();
	}
}
