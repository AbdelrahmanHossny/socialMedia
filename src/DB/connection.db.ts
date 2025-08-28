import { connect } from "mongoose";

const connectDB = async ():Promise<void> => {
  try {
    const result = await connect(process.env.DB_URI as string);
    console.log(result.models);
    console.log(`DB connected successfully ✅👌`);
  } catch (error) {
    console.log(`Fail to connect DB ❌`);
    
  }
};
 
export default connectDB