import { ethers } from 'ethers';
import { BigNumber } from 'bignumber.js';

export function toBigInt(randomBytes: Uint8Array): bigint {
    let hexString = '0x';
    randomBytes.forEach(byte => {
        hexString += byte.toString(16).padStart(2, '0');
    });
    console.log("hexString >>>> ", hexString);

    const bigintVal = BigInt(hexString);
    const maxUint192 = BigInt(2) ** BigInt(192);
    return bigintVal % maxUint192;
}


// generateUint192NonceKey generates a 192-bit (24-byte) random buffer to serve as nonce sequence number
export function generateUint192NonceKey() : bigint{
    const maxUint192 = BigInt(2) ** BigInt(192) - BigInt(1);
    const randomBigInt = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
    console.log("randomBigInt >>>> ", randomBigInt % maxUint192)
    return (randomBigInt % maxUint192);
}
