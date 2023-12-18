import { Config } from './types/types';
import {AppConfig} from "./config"

// Functions to export
export { Collectives } from './collectives/index';

export function setConfig(userConfig: Config) {
    let defaultConfig: Config = {
        OPERATOR_MNEMONIC: "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat",
        RPC_URL: "https://polygon-mumbai.g.alchemy.com/v2/cgkNW5QlsKZ8D_64-ggyUUj2aYGJqejc",// "http://localhost:8545"
        PIMLICO_API_KEY: "60dd09aa-ef22-4c57-9ca8-d3f25d7ec047"
    }
    const config = { ...defaultConfig, ...userConfig };
    AppConfig.OPERATOR_MNEMONIC = config.OPERATOR_MNEMONIC;
    AppConfig.RPC_URL = config.RPC_URL;
    AppConfig.PIMLICO_API_KEY = config.PIMLICO_API_KEY;
    AppConfig.PROVIDER = AppConfig.getProvider();

    console.log("!! AppConfig >>>> ", AppConfig.OPERATOR_MNEMONIC, AppConfig.RPC_URL, AppConfig.PIMLICO_API_KEY)
}

export {Config} from './types/types';