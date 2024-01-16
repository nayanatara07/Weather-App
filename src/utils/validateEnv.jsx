import { cleanEnv, str } from "envalid";

export default cleanEnv(process.env, {
    REACT_APP_WEATHER_API: str(),
});
