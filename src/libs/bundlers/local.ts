import * as ethers5 from 'ethers5'
import { ENTRYPOINT_ABI, ADDRESSES } from '../constants'
import { IUserOperation } from '../../types/types'

export async function send(userOperation: IUserOperation, signer: ethers5.Signer) {
    try {
    
    //   Local interact with entrypoint
    //   const entryContract = new ethers5.Contract(ENTRYPOINT_ADDRESS, ENTRYPOINT_ABI, signer)
    //   const data = entryContract.interface.encodeFunctionData("handleOps", [[userOperation], cWallet])
    //   console.log("data >> ", data)
    //   const tx = await entryContract.handleOps([userOperation], cWallet, {gasLimit: 10000000})
    //   console.log(" !! tx >>>> ", tx)


      
    //     return tx
    } catch (error) {
        console.log("LOCAL__send error >>>> ", error)
        throw error
    }
}


            // Local interact with entrypoint
            // const entryContract = new ethers5.Contract(ENTRYPOINT_ADDRESS, ENTRYPOINT_ABI, signer)
            // const tx = await entryContract.handleOps([userOperation], cMetadata.wallet)
            // console.log(" !! tx >>>> ", tx)