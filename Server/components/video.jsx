import React from 'react';
const video = (props) => {
    const { record } = props
    return (

        <video width="400" height="300" controls>
            <source src={record.params.link} type="video/mp4" />
        </video>

    );
}
export default video;