import * as dotenv from "dotenv"

dotenv.config()
const  {APP_NAME, API_URL} = process.env

export const environment = {
    appName: APP_NAME,
    apiHost: API_URL,
};