import { ADDRESSES } from './constants';

export function toBigInt(randomBytes: Uint8Array): bigint {
    let hexString = '0x';
    randomBytes.forEach(byte => {
        hexString += byte.toString(16).padStart(2, '0');
    });

    const bigintVal = BigInt(hexString);
    const maxUint192 = BigInt(2) ** BigInt(192);
    return bigintVal % maxUint192;
}


// generateUint192NonceKey generates a 192-bit (24-byte) random buffer to serve as nonce sequence number
export function generateUint192NonceKey() : bigint{
    const maxUint192 = BigInt(2) ** BigInt(192) - BigInt(1);
    const randomBigInt = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
    return (randomBigInt % maxUint192);
}

export async function rpcCall(url: string, method: string, params: any[]) {
    try {
        
    let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 1,
          jsonrpc: "2.0",
          method,
          params
        }),
      })
      const jsonResponse = await response.json()

      if (jsonResponse.error) {
        throw new Error(jsonResponse.error.message)
      }

      return jsonResponse.result

    } catch (error) {
        throw error
    }
}

// Check if the network is not supported and throw an error
export function requireSupportedChain(chainId: number) {
    if (!Object.keys(ADDRESSES).includes(chainId.toString())) {
        throw new Error("Unsupported chain")
    }
}
