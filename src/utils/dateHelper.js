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
    
    if(v === 'D'){
      result.setDate(result.getDate() + parseInt(newTtl));
     }else if(v === 'H'){
      result.setTime(result.getTime() + Number(newTtl) * 3600000);
     }else if(v === 'm'){
      console.log(result.getMinutes(),'m')
      result.setTime(result.getTime() + parseInt(newTtl) * 60000);
      console.log(result.getMinutes(),'m')
     }else if(v === 'M'){
      result.setMonth(result.getMonth() + parseInt(newTtl));
     }else if(v==='Y'){
      result.setFullYear(result.getFullYear() + parseInt(newTtl));
     }else if (v ==='S'){
      result.setSeconds(result.getSeconds() + parseInt(newTtl));
     }
   
   return result
  }