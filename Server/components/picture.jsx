import React from 'react';
const picture=(props)=>{
 const { record, property } = props
    return(
        <div>
        <img src={record.params.picture} alt="Picture" width="100px" />
     </div>

    );
}
export default picture;