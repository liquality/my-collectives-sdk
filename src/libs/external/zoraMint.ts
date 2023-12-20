import {createMintClient} from "@zoralabs/protocol-sdk";
import {custom, type Address, type PublicClient, type WalletClient, createWalletClient, encodeFunctionData} from "viem";
import * as chains from 'viem/chains'
import * as ethers5 from "ethers5";
import { CMetadata, MintParam } from "../../types/types";

export async function callData(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata, mintParam: MintParam) {

    const walletClient = createWalletClient({
        chain: chains[caller.network.name as keyof typeof chains],
        transport: custom((window as any).ethereum)
    })
    const mintClient = createMintClient({chain: walletClient.chain!});

    // prepare the mint transaction, which can be simulated via an rpc with the public client.
    const prepared = await mintClient.makePrepareMintTokenParams({

        minterAccount: `0x${(cMetadata.wallet.slice(2))}`,
        tokenAddress: `0x${mintParam.tokenContract.slice(2)}`,
        tokenId: mintParam.tokenID,
        mintArguments: {
        // address that will receive the token
        mintToAddress: `0x${mintParam.recipient.slice(2)}`,
        // quantity of tokens to mint
        quantityToMint: mintParam.quantity,
        // comment to include with the mint
        mintComment: "minted via MyCollectives",
        // optional address that will receive a mint referral reward
        mintReferral: `0x${cMetadata.address.slice(2)}`,
        },
    });
    console.log("prepared ???> ", prepared)
    const data = encodeFunctionData({
        abi: prepared.abi,
        functionName: prepared.functionName,
        args: [prepared.args]
    })
    console.log("data >>> ", data)
    return data;
}