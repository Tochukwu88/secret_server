export function getTtl( ttl) {
    if(ttl.length<2) return 'invalid'
    let result = new Date();
    // start algorithm to determin what part of the time to increment
    let timeArr = ttl.split('')
    let v = timeArr.pop()
    let newTtl= ''
    for (let i =0;i<timeArr.length;i++){
  newTtl+=timeArr[i]
    }
    //to help the user know at what point the secret becomes invalid
    let  expires_after
    if(v === 'D'){
      expires_after= `${newTtl} Day(s)`
      result.setDate(result.getDate() + parseInt(newTtl));
     }else if(v === 'H'){
      expires_after= `${newTtl} Hour(s)`
      result.setTime(result.getTime() + Number(newTtl) * 3600000);
     }else if(v === 'm'){
      expires_after= `${newTtl} Minute(s)`
      result.setTime(result.getTime() + parseInt(newTtl) * 60000);
      
     }else if(v === 'M'){
      expires_after= `${newTtl} Month(s)`
      result.setMonth(result.getMonth() + parseInt(newTtl));
     }else if(v==='Y'){
      expires_after= `${newTtl} Year(s)`
      result.setFullYear(result.getFullYear() + parseInt(newTtl));
     }else if (v ==='S'){
      expires_after= `${newTtl} Second(s)`
       
      result.setSeconds(result.getSeconds() + parseInt(newTtl));
     }
   
   return {result,expires_after}
  }