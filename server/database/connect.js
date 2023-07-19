import mongoose from "mongoose";

async function connect(DATABASE_URI){
    try{
            mongoose.set('strictQuery', true)
            await mongoose.connect(DATABASE_URI);
            console.log("[PASS] Connected to Database.");
        }catch(err){
            console.log(`[FAILED] Database connection failed. Error=>${err}`);
        }
}

export default connect;