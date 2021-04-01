import React, { useState, useEffect } from 'react'
import { useHistory, Prompt } from "react-router-dom";
import { Button, Container, Row, Col, Alert } from 'reactstrap'
import './styles/LandingPage.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CustomButton from '../Components/CustomButton'

function LandingPage() {

    let history = useHistory();

    //states
    let BasicInfo = []
    const [showCalendar, setShowCalendar] = useState(false);
    const [showDataEmptyAlert, setShowDataEmptyAlert] = useState(false);
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [dateofbirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState(false);
    const [nationality, setNationality] = useState('')
    const [residence, setResidence] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [email, setEmail] = useState('')
    const [countriesList, setCountriesList] = useState([])
    const [nationalityList, setNationalityList] = useState([])

    useEffect(() => {
        getData()
    }, [])

    //function to fetch country list and nationality list from data.json
    const getData = () => {
        fetch('data.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setCountriesList(myJson[0].countryList)
                setNationalityList(myJson[1].nationalityList)
            });
    }

    //function to validate the fields , store data in localStorage and go to next page
    function handleFormSubmit() {
        if (!firstname || !lastname || !dateofbirth || !gender || !nationality || nationality === 'nationality' || !residence || residence === 'Country of residence' ||  contactNumber.length < 10 || !email) {
            setShowDataEmptyAlert(true)
        } else {
            localStorage.setItem('firstname', firstname);
            localStorage.setItem('lastname', lastname);
            localStorage.setItem('dateofbirth', dateofbirth);
            localStorage.setItem('gender', gender);
            localStorage.setItem('nationality', nationality);
            localStorage.setItem('residence', residence);
            localStorage.setItem('contactNumber', contactNumber);
            localStorage.setItem('email', email);

            BasicInfo = [
                {
                    label : 'Name',
                    value : `${firstname} ${lastname}`
                },
                {
                    label : 'Date of birth',
                    value : dateofbirth,
                },
                {
                    label : 'Gender',
                    value : gender,
                },
                {
                    label : 'Nationality',
                    value : nationality,
                },
                {
                    label : 'Residence',
                    value : residence,
                },
                {
                    label : 'Contact Number',
                    value : contactNumber,
                },
                {
                    label : 'Email',
                    value : email,
                },
            ]
        }

        history.push({ pathname : "/form", state: BasicInfo  });

    };

    return (
        <Container fluid style={{ justifyContent: 'center', paddingRight: 10 }}>
            
            <Prompt
                when={!firstname || !lastname || !dateofbirth || !gender || !nationality || nationality === 'nationality' || !residence || residence === 'Country of residence' || !contactNumber && contactNumber.length < 10 || !email}
                message={location => `Are you sure you want to go to`}
            />

            <Row style={{ height: '100%', alignItems: 'center' }}>
               
                <Col className='left-side clip-me' style={{ height: '100%', padding: 40 }}>
                    <h1 style={{ fontWeight: 'bold', color: 'white' }}>digg</h1>
                    <img src={'./images/coverman.png'} className='man-image' />
                    <h3 className='cover-words'>
                        "Coming to Dubai with One Step Dubai has been the best decision of my life. I am now living in Dubai with a good job and I will be getting married next year!"
                    </h3>
                    <h3 className='cover-words' style={{ bottom: '14%', marginBottom: 15 }}>
                        Mohammed, One Step Dubai student
                    </h3>
                    <h3 className='cover-words' style={{ bottom: '12%' }}>
                        Pakistan
                    </h3>
                </Col>

                <Col style={{ justifyContent: 'center', marginRight: 5, marginLeft: 5 }}>
                   
                    <Row style={{ justifyContent: 'center', marginBottom: 20 }}>
                        <h1 style={{ fontSize: 27, color: 'black' }}>Apply now to work in Dubai</h1>
                    </Row>
                   
                    <Row style={{ justifyContent: 'center' }}>
                        <form onSubmit={() => handleFormSubmit()}>
                           
                            <Row>
                                <Col>
                                   <div className='text-box'>
                                        <input
                                            style={{ fontSize: 21,color: 'black' }}
                                            className='text-input'
                                            type='text'
                                            value={firstname}
                                            onChange={e => setFirstName(e.target.value)}
                                            placeholder="First name"
                                        />
                                        <label for="input" className="control-label">First name</label>
                                 </div>
                                </Col>
                                <Col>
                                    <div className='text-box'>
                                        <input
                                            style={{ fontSize: 21,color: 'black' }}
                                            className='text-input'
                                            type='text'
                                            value={lastname}
                                            onChange={e => setLastName(e.target.value)}
                                            placeholder="Last name"
                                        />
                                      <label for="input" className="control-label">Last name</label>
                                    </div>
                                </Col>
                            </Row>
                           
                            <Row>
                                <Col>
                                    <div onClick={() => setShowCalendar(!showCalendar)} className='text-box'>
                                        <input
                                            readOnly
                                            value={dateofbirth}
                                            style={{ fontSize: 16, color: dateofbirth ? 'black' : 'grey', width: '70%' }}
                                            className='text-input'
                                            type='text'
                                            placeholder="Date of birth"
                                        />
                                        <label for="input" className="control-label">Date of birth</label>
                                        <img src={'./images/calender.png'} style={{ height: 20, position:'absolute', right: 30 }} />
                                    </div>
                                    <div className='calendar'>
                                        {showCalendar &&
                                            <Calendar
                                                onChange={(e) => {
                                                    setDateOfBirth(e.toLocaleDateString())
                                                    setShowCalendar(!showCalendar)
                                                }}
                                            />}
                                    </div>
                                </Col>
                                <Col xs='12' xl='6' md='6'>
                                    <div>
                                        <label style={{ color: 'grey', fontSize: 16, display: 'flex', alignSelf: 'flex-end', marginTop: 7 }}>Gender</label>
                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <div style={{ marginRight: 10, alignContent: 'center' }}>
                                                <label class="box">Male
                                                   <input
                                                        value={gender}
                                                        disabled={gender === 'Female'}
                                                        onChange={e => {
                                                            if (e.target.checked === true) {
                                                                setGender('Male')
                                                            } else {
                                                                setGender('')
                                                            }
                                                        }}
                                                        type="checkbox"
                                                    />
                                                    <span class="mark"></span>
                                                </label>
                                            </div>
                                            <div style={{ marginRight: 10 }}>
                                                <label class="box">Female
                                                   <input
                                                        type="checkbox"
                                                        disabled={gender === 'Male'}
                                                        value={false}
                                                        onChange={e => {
                                                            if (e.target.checked === true) {
                                                                setGender('Female')
                                                            } else {
                                                                setGender('')
                                                            }
                                                        }}
                                                    />
                                                    <span class="mark"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                           
                            <Row>
                                <Col xs='12' xl='6' md='6'>
                                    <div className='text-box'>
                                        <select
                                            className='text-input'
                                            style={{
                                                width: '80%',
                                                fontSize: 17,
                                                color: nationality ? 'black' :'grey'
                                            }}
                                            onChange={e => setNationality(e.target.value)}
                                        >
                                            {nationalityList.map(nation => {
                                                return (
                                                    <option>{nation.nationality}</option>
                                                )
                                            })}
                                        </select>
                                        {nationality && <label for="input" className="control-label">Nationality</label>}
                                    </div>
                                </Col>
                                <Col xs='12' xl='6' md='6'>
                                    <div className='text-box'>
                                        <select
                                            className='text-input'
                                            style={{
                                                width: '80%',
                                                fontSize: 17,
                                                color: residence ? 'black' :'grey'
                                            }}
                                            onChange={e => setResidence(e.target.value)}
                                        >
                                            {countriesList.map(country => {
                                                return (
                                                    <option>{country.name}</option>
                                                )
                                            })}
                                        </select>
                                        { residence && <label for="input" className="control-label">Country of residence</label>}
                                    </div>
                                </Col>
                            </Row>
                            
                            <label style={{ color: 'black', display: 'flex', alignSelf: 'flex-end', fontSize: 18, marginBottom: 0, marginTop: 5 }}>How we can contact you ?</label>
                            <Row>
                                <Col>
                                    <div className='text-box'>
                                        <input
                                            style={{ fontSize: 21, color: 'black' }}
                                            className='text-input'
                                            type='number'
                                            value={contactNumber}
                                            onChange={e => setContactNumber(e.target.value)}
                                            placeholder="Contact number"
                                        />
                                        <label for="input" className="control-label">Contact number</label>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='text-box'>
                                        <input
                                            style={{ fontSize: 21, color: "black" }}
                                            className='text-input'
                                            type='email'
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder="Email address"
                                        />
                                        <label for="input" className="control-label">Email address</label>
                                    </div>
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col>
                                    {showDataEmptyAlert &&
                                        <Alert color="danger" style={{ fontSize: 15 }}>
                                            Please fill in all the required fields.
                                    </Alert>
                                    }
                                </Col>
                            </Row>
                       
                    <Row>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginLeft: 20 }}>
                            <CustomButton onClick={() => handleFormSubmit()}>Apply now</CustomButton>
                        </div>
                    </Row>
                        </form>
                    </Row>
                    
              
                </Col>
            </Row>
        </Container>
    )
}

export default LandingPage