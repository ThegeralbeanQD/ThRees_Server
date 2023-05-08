const db = require('../database/connect');
const moment = require('moment');
moment().format();

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

    static async getOneById(id) {
        const response = await db.query(`SELECT W.waste_id, W.waste_postcode, R.recycling_days, R.recycling_last_collection, R.recycling_next_collection, G.general_days, G.general_last_collection, G.general_next_collection, C.compost_days, C.compost_last_collection, C.compost_next_collection 
        FROM waste AS W LEFT JOIN recycling AS R ON W.waste_id = R.recycling_waste_id LEFT JOIN general AS G ON W.waste_id = G.general_waste_id LEFT JOIN compost AS C ON W.waste_id = C.compost_waste_id WHERE W.waste_id = $1`
            , [id])
        if (response.rows.length != 1) {
            throw new Error("Unable to locate by postcode by ID.")
        }
        return response.rows[0];
    }

    static async createNewPostcode(postcode) {
        const exsists = await db.query('SELECT COUNT(*) FROM waste WHERE waste_postcode = $1', [postcode]);
        if (parseInt(exsists.rows[0].count) > 0) {
            throw new Error("Postcode exists")
        }
        let NewPostcode = await db.query(`INSERT INTO waste (waste_postcode) VALUES ($1) RETURNING waste_id`,
            [postcode]);
        const newId = parseInt(NewPostcode.rows[0].waste_id);
        return newId;
    }

    static async insertWasteData(wasteType, data, id) {
        const { days: wasteTypeDays, last_collection: wasteTypeLastCollection } = data;
        const response = await db.query(`INSERT INTO ${wasteType} (${wasteType}_days, ${wasteType}_last_collection, ${wasteType}_waste_id) VALUES ($1, $2, $3)`,
            [wasteTypeDays, wasteTypeLastCollection, id]);
        return await Waste.getOneById(id);
    }

    static async correctPostcode(pcode) {
        let correctedPostcode = "";
        for (let i = 0; i < pcode.length; i++) {
            if (pcode[i] !== " ") {
                correctedPostcode += pcode[i];
            }
        }
        return correctedPostcode.toUpperCase();
    }

    static async create(data, id) {
        await Waste.insertWasteData('recycling', { days: data.recycling_days, last_collection: data.recycling_last_collection }, id);
        await Waste.insertWasteData('general', { days: data.general_days, last_collection: data.general_last_collection }, id);
        await Waste.insertWasteData('compost', { days: data.compost_days, last_collection: data.compost_last_collection }, id);
        return await Waste.getOneById(id);
    }


    static async updateWasteData(wasteType, data, id) {
        const { days: wasteTypeDays, last_collection: wasteTypeLastCollection } = data;
        const existingData = await db.query(`SELECT * FROM ${wasteType} WHERE ${wasteType}_waste_id = $1`, [id]);
        if (existingData.rows.length != 1) {
            await db.query(`INSERT INTO ${wasteType} (${wasteType}_days, ${wasteType}_last_collection, ${wasteType}_waste_id) VALUES ($1, $2, $3)`,
                [wasteTypeDays, wasteTypeLastCollection, id]);
            return await Waste.getOneById(id);
        } else {
            await db.query(`UPDATE ${wasteType} SET ${wasteType}_days = $1, ${wasteType}_last_collection = $2 WHERE ${wasteType}_waste_id = $3`,
                [wasteTypeDays, wasteTypeLastCollection, id]);
            return await Waste.getOneById(id);
        }
    }

    static async update(data, id) {
        console.log(data);
        if (data.recycling_days !== undefined && data.recycling_last_collection !== undefined) {
            await Waste.updateWasteData('recycling', { days: data.recycling_days, last_collection: data.recycling_last_collection }, id);
        }
        if (data.general_days !== undefined && data.general_last_collection !== undefined) {
            await Waste.updateWasteData('general', { days: data.general_days, last_collection: data.general_last_collection }, id);
        }
        if (data.compost_days !== undefined && data.compost_last_collection !== undefined) {
            await Waste.updateWasteData('compost', { days: data.compost_days, last_collection: data.compost_last_collection }, id);
        }
        return await Waste.getOneById(id);
    }

    static async destroyWasteData(wasteType, id) {
        await db.query(`DELETE FROM ${wasteType} WHERE ${wasteType}_waste_id = $1;`, [id]);
        return await Waste.getOneById(id)
    }


    static async destroy(id) {
        let response = await Waste.destroyWasteData('recycling', id);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete recycling data.")
        }
        response = await Waste.destroyWasteData('general', id);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete general data.")
        }
        response = await Waste.destroyWasteData('compost', id);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete compost data.")
        }
        response = await db.query('DELETE FROM waste WHERE waste_id = $1 RETURNING *;', [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete waste data with this ID.")
        }
        return new Waste(response.rows[0]);
    }

    // }
    // static async checkIfUpdated(data) {
    //     const todayDate = moment(new Date('2024-06-29')).format('YYYY-MM-DD'); //Get todays date
    //     const lastCollection = new Date(data.recycling_last_collection); //Get last waste collection
    //     const daysBetween = data.recycling_days // getting the days between collections

    //     function addDays(date, days) {
    //         date.setDate(date.getDate() + days);
    //         return new Date(date);
    //     } //Function which will add days to the last collection

    //     let updatedCollection = addDays(lastCollection, daysBetween) //Variable that holds the new collection date

    //     let originalCollection = moment(data.recycling_last_collection).format('YYYY-MM-DD') //This formats the original collection date
    //     let newCollection = moment(updatedCollection).format('YYYY-MM-DD') //This formats into SQL from so that it can patch the date if needed

    //     while (moment(todayDate).diff(moment(updatedCollection), 'days') > daysBetween) {
    //         updatedCollection = addDays(updatedCollection, daysBetween);
    //         newCollection = moment(updatedCollection).format('YYYY-MM-DD');
    //         originalCollection = moment(lastCollection).format('YYYY-MM-DD');
    //     }

    //     if (moment(todayDate).isSame(newCollection, 'day')) {
    //         await db.query(`UPDATE recycling SET recycling_last_collection = '${originalCollection}' WHERE recycling_waste_id = 1`)
    //         console.log(`collection is today`);
    //     }
    //     else if (moment(todayDate).isBefore(newCollection, 'day')) {
    //         console.log(`next collection is on ${newCollection} last collection was ${originalCollection}`);
    //     }
    //     else {
    //         await db.query(`UPDATE recycling SET recycling_last_collection = '${newCollection}' WHERE recycling_waste_id = 1`)
    //         console.log(`today is ${todayDate}, collection was on ${originalCollection}, next collection is ${newCollection}`);
    //     }

    //     return Waste.getOneById(data.waste_id)
    // }

    static async checkIfUpdated(data) {
        const todayDate = moment(new Date('2024-07-02')).format('YYYY-MM-DD'); //Get todays date
        const lastCollection = new Date(data.recycling_last_collection); //Get last waste collection
        const daysBetween = data.recycling_days // getting the days between collections

        let updatedLastCollection = await Waste.checkLastCollection(todayDate, lastCollection, daysBetween);
        updatedLastCollection = moment(updatedLastCollection).format('YYYY-MM-DD');
        let nextCollection = moment(updatedLastCollection).add(daysBetween, 'days')
        nextCollection = moment(nextCollection).format('YYYY-MM-DD')
        console.log(todayDate, updatedLastCollection, nextCollection);
        
        if (moment(todayDate).isSame(nextCollection, 'day')) {
            await db.query(`UPDATE recycling SET recycling_last_collection = '${todayDate}' WHERE recycling_waste_id = 1`)
            console.log(`collection is today`);
        }
        else if (moment(todayDate).isBefore(updatedLastCollection, 'day')) {
            console.log(`next collection is on ${nextCollection}`);
        }
        else {
            await db.query(`UPDATE recycling SET recycling_last_collection = '${updatedLastCollection}' WHERE recycling_waste_id = 1`)
            console.log(`today is ${todayDate}, collection was on ${updatedLastCollection}, next collection is ${nextCollection}`);
        }

        return Waste.getOneById(data.waste_id)
    }

    static async checkLastCollection(todayDate, lastCollection, daysBetween){
        // console.log(todayDate, lastCollection, daysBetween);
        function addDays(date, days) {
            date.setDate(date.getDate() + days);
            return new Date(date);
        } //Function which will add days to the last collection

        while (moment(todayDate).diff(moment(lastCollection), 'days') > daysBetween){
            lastCollection = addDays(lastCollection, daysBetween)
        }
        return lastCollection
    }
}


module.exports = Waste