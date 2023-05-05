const db = require('../database/connect');

class Waste {
    constructor({waste_id, waste_postcode}){
        this.id = waste_id
        this.postcode = waste_postcode
    }

    static async getAll() {
        const response = await db.query("SELECT COUNT(*) FROM waste");
        return parseInt(response.rows[0].count)
    }

    static async getId(postcode) {
        const response = await db.query("SELECT waste_id FROM waste WHERE waste_postcode = $1", [postcode]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate ID.")
        }
        return response.rows[0].waste_id;
    }


    static async getOneByPostcode(id) {
        console.log(id);
        const response = await db.query("SELECT W.waste_id, W.waste_postcode, R.recycling_days, R.recycling_last_collection, G.general_days, G.general_last_collection, C.compost_days, C.compost_last_collection FROM waste AS W LEFT JOIN recycling AS R ON W.waste_id = R.recycling_waste_id LEFT JOIN general AS G ON W.waste_id = G.general_waste_id LEFT JOIN compost AS C ON W.waste_id = C.compost_waste_id WHERE W.waste_id = $1"
        , [id])
        if (response.rows.length != 1) {
            throw new Error("Unable to locate by postcode.")
        }
        return response.rows[0];
    }


    static async createRecycle(data) {
        const {waste_postcode, recycling_days, recycling_last_collection } = data;
        let NewPostcode = await db.query("INSERT INTO waste (waste_postcode) VALUES ($1) RETURNING waste_id",
            [waste_postcode]);
        const newId = parseInt(NewPostcode.rows[0].waste_id);

        let response = await db.query("INSERT INTO recycling (recycling_days, recycling_last_collection, recycling_waste_id) VALUES ($1, $2, $3)",
            [recycling_days, recycling_last_collection, newId]);

        const newPost = await Waste.getOneByPostcode(newId);
        return newPost;
    }

    // static async destroy(data) {
    //     console.log(data);
    //     const response = await db.query('DELETE FROM diaries WHERE snack_id = $1 RETURNING *;', [data.id]);
    //     if (response.rows.length != 1) {
    //         throw new Error("Unable to delete entry.")
    //     }
    //     return new Snack(response.rows[0]);
    // }
}

module.exports = Waste