import React from 'react'

function CustomButton(props){
    return(
        <div onClick={props.onClick} style={{width: "50%", height:60}}>
            <div className={props.color === 'outline' ?'btn-outline' : 'btn-grad'} style={{display:'flex', justifyContent:'center'}}>
                <span style={{fontSize: 17, marginTop: 3, marginBottom: 3}}>{props.children}</span>
            </div>
        </div>
    )
}

export default CustomButton