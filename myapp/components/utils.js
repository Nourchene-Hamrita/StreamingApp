export const dateParser=(num)=>{
    let options={hour:"2-digit",minute:"2-digit",/*second:"2-digit",weekday:"short",year:"numeric",*/
    month:"short",day:"numeric"};
    let timestamp=Date.parse(num);
    let date= new Date(timestamp).toLocaleDateString('en-EN',options);
    return date.toString();
};
export const timestampParser=(num)=>{
    let options={hour:"2-digit",minute:"2-digit",second:"2-digit",weekday:"long",year:"numeric",
    month:"short",day:"numeric"};
    let date= new Date(num).toLocaleDateString('fr-FR',options);
    return date.toString();
};