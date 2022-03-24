import Secret from './secret_model';
import { InternalServerError, CustomError } from '../../../utils/customError';
import responseHandler from '../../../utils/responseHandler';
import { getTtl } from '../../../utils/dateHelper';
import { decrypt, encrypt } from '../../../utils/crypto';


export async function addSecret(req, res, next) {
 
  try {
     const { secret, ttl } = req.body;
    
     
     if(!secret || !ttl) return responseHandler(res, 400,'', 'secret and time to live are required');
     //get hash for dynamic url
    async function generatHash() {
      while (true) {
          var uid = ("0000" + ((Math.random() * Math.pow(36, 4)) | 0).toString(36)).slice(-4);
          const checkHash = await Secret.findOne({hash:uid})
          if (!checkHash) {
            
              return uid;
          }
      }
  }
  // encrypt the secret
  const encryptedSecret = encrypt(secret)
 const expiresAt =getTtl(ttl)
  const uniquehash = await generatHash()
  const payload ={
    secretText: encryptedSecret.content,
    expiresAt:expiresAt.result,
    
    iv:encryptedSecret.iv,
    hash:uniquehash
  }
 const newSecret =  await new Secret(payload).save()
 
 

    return responseHandler(res, 201,{hash:uniquehash,expires_after:expiresAt.expires_after}, 'you have successfully add a secret');
  } catch (error) {
    next(new InternalServerError(error));
  }
}
export async function getSecret(req, res, next) {
  try {
     const  hash  = req.params.hash;
     const getSecret = await Secret.findOne({hash,expiresAt:{ $gte: new Date() }})
     if(!getSecret){
      return responseHandler(res, 404,'', 'secret does not exist or has exceeded it"s life span');
     }
     //decrypt the secret
  const decryptedSecret =    decrypt({
      iv: getSecret.iv,
      content: getSecret.secretText
    }
    )
     
     return responseHandler(res, 200,decryptedSecret, 'successful');
   
  
  } catch (error) {
    next(new InternalServerError(error));
  }
}
