import React,{useEffect,useState} from 'react'
import { Row, Col, Container, Button } from 'reactstrap'
import BadgeList from '../Components/BadgeList'
import CustomButton from '../Components/CustomButton'
import ProgressBar from '../Components/ProgressBar'
import ResultComponent from '../Components/ResultComponent'
import './Form.css'

function Form() {
    
    let BasicInfo = [
        {
            label : 'Name',
            value : `${localStorage.getItem("firstname")} ${localStorage.getItem("lastname")}`
        },
        {
            label : 'Date of birth',
            value : localStorage.getItem("dateofbirth").split('00:00:00')[0],
        },
        {
            label : 'Gender',
            value : localStorage.getItem("gender"),
        },
        {
            label : 'Nationality',
            value : localStorage.getItem("nationality"),
        },
        {
            label : 'Residence',
            value : localStorage.getItem("residence"),
        },
        {
            label : 'Contact Number',
            value : localStorage.getItem("contactNumber"),
        },
        {
            label : 'Email',
            value : localStorage.getItem("email"),
        },
    ]
    
    const [formContent, setFormContent] = useState([])
    const [formIndex, setFormIndex] = useState(1)
    const [progessValue, setProgessValue] = useState(1)
    const [formCurrentValue, setFormCurrentValue] = useState([])
    const [questionnaire, setQuestionnaire] = useState([])
    useEffect(() => {
        getData()    
    }, [])

    const getData = () => {
        fetch('data.json'
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){
            return response.json();
          })
          .then(function(myJson) {
                console.log(myJson[2].formContentList)
                setFormContent(myJson[2].formContentList)
          });
    }

    function nextButtonHandler() {
        if (formIndex === 1 && formCurrentValue && formCurrentValue.length >= 3 ) {
            localStorage.setItem(formIndex, JSON.stringify(formCurrentValue));
            console.log("formCurrentValue",formCurrentValue)
            setQuestionnaire([...questionnaire, ...formCurrentValue])
            setFormIndex(formIndex + 2)
            setFormCurrentValue([])
            setProgessValue(progessValue+1)
        } else if (formIndex > 2 && formCurrentValue.length != 0) {
            console.log("formCurrentValue",formCurrentValue)
            setQuestionnaire([...questionnaire,...formCurrentValue])
            localStorage.setItem(formIndex, JSON.stringify(formCurrentValue));
            setFormIndex(formIndex + 1)
            setFormCurrentValue([])
            setProgessValue(progessValue+1)
        }
    }
    function backButtonHandler() {
        if(formIndex === 3){
            setFormIndex(1)
            setProgessValue(progessValue-1)
        } else {
            setFormIndex(formIndex - 1)
            setProgessValue(progessValue-1)
        }
        setFormCurrentValue([])
    }

    function badgeOnClickHandler(badgeValue, title) {
        if(formIndex === 1){
            setFormCurrentValue([{title,badgeValue}, ...formCurrentValue])
        } else {
            setFormCurrentValue([{title,badgeValue}])
        }
    }
    return(
        <Container fluid className="form-container" style={{padding: 30}}>
            <Row style={{marginTop: 10, marginBottom: 30,}}>
                <Col xs='0' xl='6' md='6' style={{fontSize: 35, fontWeight:'bold'}}>digg</Col>
                <Col xs='12' xl='6' md='6'>
                    <ProgressBar
                        width={`${(progessValue/8)*100}%`}
                    />
                </Col>
            </Row>
                { formIndex === 1 ?
                    formContent.map((item,index) => {
                        if(index < 3) {
                            return(
                                <Row style={{marginBottom: 30}}>
                                    <BadgeList
                                        title={item.title}
                                        onClick={(badgeValue)=> badgeOnClickHandler( badgeValue , item.title )}
                                        badgeList={item.badgeList}
                                    />
                                </Row>
                            )
                        }
                    })
                    :
                    formIndex <= 8 ?
                        <Row >
                            <BadgeList
                                title={formContent[formIndex].title}
                                onClick={(badgeValue)=> badgeOnClickHandler( badgeValue , formContent[formIndex].title )}
                                badgeList={formContent[formIndex].badgeList}
                            />
                        </Row>
                    :
                    <Col>
                        <ResultComponent
                            BasicInfo={BasicInfo}
                            Questionnaire={questionnaire}
                        />
                    </Col>
                }
            {console.log("object",questionnaire)}
            <Row xl='6' style={{marginTop: 30}}>
                <CustomButton color='outline' onClick={() => backButtonHandler() }>Back</CustomButton>
                <CustomButton onClick={() => nextButtonHandler() }>{formIndex >= 8 ? 'Compelete' :'Next'}</CustomButton>
            </Row>
        </Container >

    )
}

export default Form