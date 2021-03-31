import React from  'react'
import './ProgressBar.css'

function ProgressBar(props) {
    return(
        <div>
            <label>Progress</label>
            <div style={{width:"100%" , backgroundColor:'#EFEFEF', borderRadius: 50,height: 15}}>
                <div className='bar-inner' style={{width: props.width, borderRadius: 50, color:'#8E27EA',height: 15 }}>
                    .
                </div>
            </div>
        </div>
    )
}
export default ProgressBar