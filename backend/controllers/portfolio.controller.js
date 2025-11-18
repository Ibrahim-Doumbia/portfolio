const Portfolio = require("../models/portfolio")


class PortfolioController {
    
    // ➤ CREATE
    static async create(req, res) {
        try {
            const { nom, sujet, message } = req.body

            if (!nom || !sujet || !message) {
                return res.status(400).json({
                    error: "Tous les champs (nom, sujet, message) sont obligatoires."
                })
            }

            const data = await Portfolio.create({ nom, sujet, message })

            res.status(201).json({
                message: "Message envoyé avec succès créé avec succès",
                data
            })

        } catch (error) {
            console.error("Erreur create Portfolio:", error)
            res.status(500).json({ error: "Erreur interne du serveur" })
        }
    }


    // ➤ GET ALL
    static async getAll(req, res) {
        try {
            const rows = await Portfolio.getAll()
            res.json(rows)
        } catch (error) {
            console.error("Erreur getAll Portfolio:", error)
            res.status(500).json({ error: "Erreur interne du serveur" })
        }
    }


    // ➤ GET BY ID
    static async getById(req, res) {
        try {
            const { id } = req.params
            const rows = await Portfolio.getById(id)

            if (rows.length === 0) {
                return res.status(404).json({ error: "Message introuvable" })
            }

            res.json(rows[0])

        } catch (error) {
            console.error("Erreur getById Portfolio:", error)
            res.status(500).json({ error: "Erreur interne du serveur" })
        }
    }


    // ➤ UPDATE
    static async update(req, res) {
        try {
            const { id } = req.params
            const updated = await Portfolio.update(id, req.body)

            if (!updated) {
                return res.status(404).json({ error: "Message introuvable ou aucun champ mis à jour" })
            }

            res.json({ message: "Mise à jour effectuée avec succès" })

        } catch (error) {
            console.error("Erreur update Portfolio:", error)
            res.status(500).json({ error: "Erreur interne du serveur" })
        }
    }


    // ➤ DELETE
    static async delete(req, res) {
        try {
            const { id } = req.params
            const result = await Portfolio.delete(id)

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Message introuvable" })
            }

            res.json({ message: "Suppression effectuée avec succès" })

        } catch (error) {
            console.error("Erreur delete Portfolio:", error)
            res.status(500).json({ error: "Erreur interne du serveur" })
        }
    }
}

module.exports = PortfolioController
