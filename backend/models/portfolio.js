const pool = require("../config/database")

class Portfolio {
    static async create({
        nom,
        sujet,
        message
    }){
        const sql = `INSERT INTO portfolio (nom, sujet, message) VALUES (?, ?, ?)`
        const [result] = await pool.query(sql, [nom, sujet, message])
        return {id: result.id, nom, sujet, message}
    }

    static async getAll(){
        const sql =  `SELECT * FROM portfolio`
        const [rows] = await pool.query(sql)
        return rows
    }

    static async getById(id){
        const sql = `SELECT * FROM portfolio WHERE id = ?`
        const [rows] = await pool.query(sql, [id])
        return rows
    }

    static async update(id, data) {
        const validFields = ['nom', 'sujet', 'message']
        const updates = []
        const values = []

        // Filtrer et valider les champs
        Object.keys(data).forEach(key => {
            if (validFields.includes(key) && data[key] !== undefined) {
                updates.push(`${key} = ?`)
                values.push(data[key])
            }
        })

        if (updates.length === 0) {
            throw new Error('Aucun champ valide à mettre à jour')
        }

        values.push(id)
        const sql = `UPDATE portfolio SET ${updates.join(', ')} WHERE id = ?`
        const [result] = await pool.query(sql, values)
        return result.affectedRows > 0
    }

    static async delete(id){
        const sql = `DELETE FROM portfolio WHERE id = ?`
        const [result] = await pool.query(sql, [id])
        return result
    }
}

module.exports = Portfolio