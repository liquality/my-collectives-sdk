import { Config } from './types/types';
import {AppConfig} from "./config"

// Functions to export
export { Collective } from './collectives/index';
export { Pool } from './pools/index';
export { HoneyPot } from './honeyPots/index';

export function setConfig(userConfig: Config) {
    let defaultConfig: Config = {
        OPERATOR_MNEMONIC: "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat",
        RPC_URL: "https://eth-goerli.g.alchemy.com/v2/NoipFVjRtyObPoZ1n35BPiLqY8DWsqZA",// 
        PIMLICO_API_KEY: "60dd09aa-ef22-4c57-9ca8-d3f25d7ec047",
        BICONOMY_PAYMASTER: "https://paymaster.biconomy.io/api/v1/5/Ss9NO7p3y.ad8caffd-7726-49bf-a68e-b7fe86ad1883", // "https://paymaster.biconomy.io/api/v1/80001/wKaNk3Beg.cc64c1e0-8898-4cb8-aeed-3846cfc6967e", //
        BICONOMY_BUNDLER_API_KEY: "nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"
    }
    const config = { ...defaultConfig, ...userConfig };
    AppConfig.OPERATOR_MNEMONIC = config.OPERATOR_MNEMONIC;
    AppConfig.RPC_URL = config.RPC_URL;
    AppConfig.PIMLICO_API_KEY = config.PIMLICO_API_KEY;
    AppConfig.PROVIDER = AppConfig.getProvider();
    AppConfig.BICONOMY_PAYMASTER = config.BICONOMY_PAYMASTER;
    AppConfig.BICONOMY_BUNDLER_API_KEY = config.BICONOMY_BUNDLER_API_KEY;
}

export {Config} from './types/types';
export {SupportedPlatforms} from './types/types';