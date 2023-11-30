import { cleanEnv, str, port, CleanedEnvAccessors } from "envalid";

const env: Readonly<{
    PORT: number
    MONGO_URI: string
} & CleanedEnvAccessors> = cleanEnv(process.env, {
    PORT: port(),
    MONGO_URI: str()
})


export default env