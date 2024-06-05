import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import questions from '../assets/questions.json'
import missionPassed from '../assets/mission passed.mp3'
import missionFailed from '../assets/mission failed.mp3'
import AOS from 'aos';
import 'aos/dist/aos.css';


function Quiz() {
  const [currentQuest, setCurrentQuest] = useState(0)
  const [score,setScore] = useState(0)
  const [result,setResult] = useState(true)
  const [gameFailed,setGameFailed] = useState(false)
  const [sound,setSound] = useState(1)

  useEffect(()=>{
    if (sound===0) {
      playFailed()
    }else if (sound===2) {
      playPassed()
    }
    AOS.init()
  },[sound])

  const playFailed=()=>{
    new Audio(missionFailed).play()
  }

  const playPassed=()=>{
    new Audio(missionPassed).play()
  }

  const handleButton = (isCorrect) => {
    if (isCorrect) {
      setScore(score+1)
      if (currentQuest+1<questions.length) {
        setCurrentQuest(currentQuest+1)
      } else {
        setResult(false)
        setSound(sound+1)
      }
    } else {
      setResult(false)
      setGameFailed(true)
      setSound(sound-1)
    }
  }

  const handleRestart = () => {
    setScore(0)
    setCurrentQuest(0)
    setResult(true)
    setGameFailed(false)
    setSound(1)
  }
  
  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: "#31acff" }}>
      <Grid container className="d-flex justify-content-center" sx={{ minHeight: "100vh" }}>
        <Grid md={6.5} xs={12} sx={{ minHeight: "100vh" }}>
          <div className='d-flex align-items-center' style={{ minHeight: "100vh" }}>
            <div className='w-100 bgdiv rounded-4' style={{ minHeight: "450px", backgroundColor: "#ff8431" }}>
              {result ?
                <Row className='w-100 m-0 rounded-4' style={{ backdropFilter: "blur(10px)", minHeight: "450px", }}>
                  <Col xs={12} className='heading' style={{ height: "10%" }}>
                    Quiz Challenge
                    <hr className='w-75' />
                  </Col>
                  <Col xs={12}>
                    <p className='text-center text-white'>{currentQuest + 1}/{questions.length}</p>
                    <p className='quizPara'>{questions[currentQuest].question}</p>
                  </Col>
                  <Col xs={12}>
                    <Grid container spacing={2}>
                      {questions[currentQuest].answerOptions.map(options => (
                        <Grid xs={12} sm={6} md={12} lg={6} key={options.id}>
                          <div className='d-flex justify-content-center'>
                            <button onClick={()=>handleButton(options.isCorrect)} className='bttnstyle'>{options.text}</button>
                          </div>
                        </Grid>
                      ))
                      }
                    </Grid>
                  </Col>
                </Row>
                : 
                <Row className='w-100 m-0 rounded-4 d-flex justify-content-center' style={{ backdropFilter: "blur(10px)", height: "450px", }}>
                  <Col xs={12} className='heading' style={{ height: "10%" }}>
                    Quiz Challenge
                    <hr className='w-75' />
                  </Col>
                  <Col xs={8} className='pt-3 rounded-3' style={{backgroundColor:"#9ab7ff6e"}}>
                    {gameFailed ?
                      <div data-aos="zoom-in" data-aos-duration="2000"className='quizPara'>Challenge Failed</div>
                    :
                      <div data-aos="zoom-in" data-aos-duration="2000" className='quizPara'>Challenge Passed</div>
                    }
                    <p className='quizPara'>{score} out of {questions.length} - ({(score/questions.length)*100}%)</p>
                  </Col>
                  <Col xs={12}>
                    <Grid container spacing={2} className="justify-content-center">
                        <Grid xs={6} >
                          <div className='d-flex justify-content-center pt-4'>
                            <button onClick={handleRestart} className='bttnstyle w-50'>Restart</button>
                          </div>
                        </Grid>
                    </Grid>
                  </Col>
                </Row>
              }
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Quiz