import {createMintClient} from "@zoralabs/protocol-sdk";
import {custom, createWalletClient, encodeFunctionData, createPublicClient, hexToBigInt, toHex} from "viem";
import * as chains from 'viem/chains'
import * as ethers5 from "ethers5";
import { CMetadata, MintParam } from "../../types/types";

export async function callData(caller: ethers5.providers.Web3Provider, cMetadata: CMetadata, mintParam: MintParam) {
    // get caller chain
    const chain = getChain(chains, (await caller.getNetwork()).chainId);
    if (!chain) {
        throw new Error(`Unsupported chainId: ${caller.network.chainId}`);
    }
    const walletClient = createWalletClient({
        chain,
        transport: custom((window as any).ethereum)
    })
    const mintClient = createMintClient({chain: walletClient.chain!});
    const publicClient = createPublicClient({
        transport: custom((window as any).ethereum), chain: walletClient.chain!});

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
            mintComment: "Minted via MyCollectives.tech",
            // optional address that will receive a mint referral reward
            mintReferral: `0x${cMetadata.address.slice(2)}`,
        },
    });

    const data = encodeFunctionData({
        abi: prepared.abi,
        functionName: prepared.functionName,
        args: [...(prepared.args as Array<any>)]
    })
    
    return data;
}

function getChain(chains: any, chainId: any) {
    for (const chain in chains) {
        if (chains[chain].id === chainId) {
            return chains[chain];
        }
      }
}
