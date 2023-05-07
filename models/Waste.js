const db = require('../database/connect');

class Waste {
    constructor({ waste_id, waste_postcode }) {
        this.id = waste_id
        this.postcode = waste_postcode
    }

    static async getAll() {
        const response = await db.query(`SELECT COUNT(*) FROM waste`);
        return parseInt(response.rows[0].count)
    }

    static async getId(postcode) {
        const response = await db.query(`SELECT waste_id FROM waste WHERE waste_postcode = $1`, [postcode]);
        if (response.rows.length != 1) {
            throw new Error("Unable postcode does not match any IDs.")
        }
        return response.rows[0].waste_id;
    }


    static async getOneByPostcode(id) {
        const response = await db.query(`SELECT W.waste_id, W.waste_postcode, R.recycling_days, R.recycling_last_collection, G.general_days, G.general_last_collection, C.compost_days, C.compost_last_collection 
        FROM waste AS W LEFT JOIN recycling AS R ON W.waste_id = R.recycling_waste_id LEFT JOIN general AS G ON W.waste_id = G.general_waste_id LEFT JOIN compost AS C ON W.waste_id = C.compost_waste_id WHERE W.waste_id = $1`
            , [id])
        if (response.rows.length != 1) {
            throw new Error("Unable to locate by postcode by ID.")
        }
        return response.rows[0];
    }

    static async createNewPostcode(postcode) {
        const exsists = await db.query('SELECT COUNT(*) FROM waste WHERE waste_postcode = $1', [postcode]);
        if (parseInt(exsists.rows[0].count) > 0){
            throw new Error("Postcode exists")
        }
        let NewPostcode = await db.query(`INSERT INTO waste (waste_postcode) VALUES ($1) RETURNING waste_id`,
            [postcode]);
        const newId = parseInt(NewPostcode.rows[0].waste_id);
        return newId;
    }
    
    static async insertWasteData(wasteType, data, id) {
        const { days: wasteTypeDays, last_collection: WasteTypeLastCollection } = data;
        const response = await db.query(`INSERT INTO ${wasteType} (${wasteType}_days, ${wasteType}_last_collection, ${wasteType}_waste_id) VALUES ($1, $2, $3)`,
            [wasteTypeDays, WasteTypeLastCollection, id]);
        return await Waste.getOneByPostcode(id);
    }
    // static async createRecycle(data, id) {
    //     return await Waste.insertWasteData('recycling', { days: data.recycling_days, last_collection: data.recycling_last_collection }, id);

    // }

    // static async createGeneral(data, id) {
    //     await Waste.insertWasteData('general', { days: data.general_days, last_collection: data.general_last_collection }, id);
    // }

    // static async createCompost(data, id) {
    //     await Waste.insertWasteData('compost', { days: data.compost_days, last_collection: data.compost_last_collection }, id);
    // }

    static async create(data, id) {
        await Waste.insertWasteData('recycling', { days: data.recycling_days, last_collection: data.recycling_last_collection }, id);
        await Waste.insertWasteData('general', { days: data.general_days, last_collection: data.general_last_collection }, id);
        await Waste.insertWasteData('compost', { days: data.compost_days, last_collection: data.compost_last_collection }, id);
        return await Waste.getOneByPostcode(id);
    }


    static async updateData(data, id) {
        // const response = await db.query(`UPDATE snack SET votes = votes + $1 WHERE snack_id = $2 RETURNING snack_id, snack_name, votes;`,
        //     [data.votes, id]);
        // if (response.rows.length != 1) {
        //     throw new Error("Unable to update votes.")
        // }
        // return new Snack(response.rows[0]);

        const { days: wasteTypeDays, last_collection: WasteTypeLastCollection } = data;
        const response = await db.query(`UPDATE ${wasteType} SET ${wasteType}_days = $1, ${wasteType}_last_collection = $2`,
            [wasteTypeDays, WasteTypeLastCollection, id]);
        return await Waste.getOneByPostcode(id);
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