import React,{useState,useEffect} from 'react'


function BadgeList(props) {
    
    useEffect(() => {
        setCurrentIndex(null)
    }, [props.title])
    
    const [currentIndex, setCurrentIndex] = useState(null)

     return(
         <div className='badge-contanier'>
             <label>{props.title}</label>
             <div className='badges-row'>
                 { props.badgeList.map((item,index) => {
                     return(
                         <div 
                            onClick={()=>{
                                setCurrentIndex(index)
                                props.onClick(item)
                            }} 
                            style={{backgroundColor: currentIndex === index ? "#8E27EA" : '#EFEFEF'}}
                            className='badge-style'
                         >
                             <div style={{marginRight: 7}}>{item.emoji}</div>
                             <div style={{color: currentIndex === index ? "#EFEFEF" : 'black'}}>{item.text}</div>
                         </div>
                     )
                  })}
             </div>
         </div>
     )
}

export default BadgeList