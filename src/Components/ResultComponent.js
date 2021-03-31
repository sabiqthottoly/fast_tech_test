import React from 'react'
import { Row, Col } from 'reactstrap'

function ResultComponent(props){
    return(
        <>
            <label>Complete - Review your application</label>        
            <Row style={{backgroundColor: "#EFEFEF", padding: 10}}>
                <Col>
                    <Row style={{ paddingLeft: 10}}>
                        <label style={{color: "#8253DF", marginRight: 5}}>Basic Information</label>
                        <label>🖊</label>
                    </Row>
                    <Row style={{padding: 20}}>
                        {
                            props.BasicInfo.map(each => {
                                return(
                                    <div style={{ display: 'flex',marginRight: 20 }}>
                                        <label style={{marginRight: 5}}>{`${each.label}:`}</label>
                                        <label style={{color: "#4d4d4d" }}>{each.value}</label>
                                    </div>
                                )
                            })
                        }
                    </Row>
                </Col>
            </Row>
            <Row style={{backgroundColor: "#EFEFEF", padding: 20, marginTop: 20}}>
                  <Col>
                        <Row><label style={{color: "#8253DF", marginRight: 5}}>Questionnaire</label></Row>
                        {
                            props.Questionnaire.map(item => {
                                return(
                                    <Row style={{flexDirection:'column', marginTop: 10}}>
                                        <div>
                                            <label>{item.title}</label>
                                            <label>🖊</label>
                                        </div>
                                        <Col xs='12' md='4' xl='3'>
                                            <div 
                                               onClick={()=>{
                                               }} 
                                               style={{ justifyContent:'center'}}
                                               className='badge-style grad-badge'
                                            >
                                                <div style={{marginRight: 7}}>{item.badgeValue.emoji}</div>
                                                <div style={{color:"#EFEFEF"}}>{item.badgeValue.text}</div>
                                            </div>
                                        </Col>
                                        <Col xs='0' md="8" xl='9'>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                  </Col>      
            </Row>
        </>
    )
}

export default ResultComponent