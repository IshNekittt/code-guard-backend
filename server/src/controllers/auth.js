//import createHttpError from "http-errors";
import { statisticsServices } from "../services/auth.js";
export const statisticsController = async (req, res, next) => {

    const userId = req.user._id;
    try {
        const data = await statisticsServices({ userId });
        if (!data) {
            console.log("transaction list is empty")
        }

        return res.status(200).json({
            status: 200,
            message: "statistics data is successfully loaded",
            data
        });
    } catch (error) {
        next(error);
    }
};