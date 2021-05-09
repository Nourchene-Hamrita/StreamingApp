import React from 'react';
const video = (props) => {
    const { record } = props
    return (

        <video width="320" height="240" controls>
            <source src={record.params.link} type="video/mp4" />
        </video>

    );
}
export default video;