import React,{useEffect,useState} from 'react'
import { Row, Col, Container, Button } from 'reactstrap'
import BadgeList from '../Components/BadgeList'
import CustomButton from '../Components/CustomButton'
import ProgressBar from '../Components/ProgressBar'
import ResultComponent from '../Components/ResultComponent'
import './styles/Form.css'

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
    const [editMode, setEditMode] = useState(false)

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
        if (editMode) {
            setFormIndex(9)
            setEditMode(false)
            setProgessValue(8)
        } else if (formIndex === 1 && formCurrentValue && formCurrentValue.length >= 3 ) {
            localStorage.setItem(formIndex, JSON.stringify(formCurrentValue));
            setQuestionnaire([...questionnaire, ...formCurrentValue])
            setFormIndex(formIndex + 2)
            setFormCurrentValue([])
            setProgessValue(progessValue+1)
        } else if (formIndex > 2 && formCurrentValue.length != 0) {
            setQuestionnaire([...questionnaire,...formCurrentValue])
            localStorage.setItem(formIndex, JSON.stringify(formCurrentValue));
            setFormIndex(formIndex + 1)
            setFormCurrentValue([])
            setProgessValue(progessValue+1)
        }
    }

    function backButtonHandler() {
        if(formIndex === 3){
            let removelastelement = questionnaire.slice(0, questionnaire.length - 3)
            setQuestionnaire(removelastelement)
            setFormIndex(1)
            setProgessValue(progessValue-1)
        } else {
            let removelastelement = questionnaire.slice(0, questionnaire.length - 1)
            setQuestionnaire(removelastelement)
            setFormIndex(formIndex - 1)
            setProgessValue(progessValue-1)
        }
        setFormCurrentValue([])
    }

    function questionnaireEditHandler(index) {
        setEditMode(true)
        setFormIndex(index)
        if (index < 3) {
            setProgessValue(1)
        } else {
            setProgessValue(index)
        }
    }

    function EditModeBadgeOnClickHandler(badgeValue, title){
        let editIndex = null
        questionnaire.forEach((item,index)=> {
            if (item.title === title) {
                console.log("true")
                 editIndex = index
            }
        })

        if (editIndex) {
            questionnaire[editIndex] = {title,badgeValue};
            setQuestionnaire(questionnaire)
        }

    }

    function badgeOnClickHandler(badgeValue, title) {
        if(formIndex === 1){
            
            formCurrentValue.forEach((item,index) => {
                if(item.title === title) {
                    formCurrentValue.splice(index,1)
                }     
            })

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
                { 
                editMode ? 
                    <Row >
                        <BadgeList
                            title={formContent[formIndex].title}
                            onClick={(badgeValue)=> EditModeBadgeOnClickHandler(  badgeValue , formContent[formIndex].title )}
                            badgeList={formContent[formIndex].badgeList}
                        />
                    </Row>
                :
                formIndex < 3  ?
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
                            questionnaireEditHandler={(index)=>questionnaireEditHandler(index)}
                        />
                    </Col>
                }
            <Row xl='6' style={{marginTop: 30}}>
                <CustomButton color='outline' onClick={() => backButtonHandler() }>Back</CustomButton>
                <CustomButton onClick={() => nextButtonHandler() }>{formIndex >= 9 ? 'Compelete' :'Next'}</CustomButton>
            </Row>
        </Container >

    )
}

export default Form