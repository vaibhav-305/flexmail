import React, { useState } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const Mail = (props) => {
    const [time, setTime] = useState('')
    const [from, setFrom] = useState('')
    const [subject, setSubject] = useState('')
    const [textBody, setTextBody] = useState('')
    const identifier = props.identifier
    const domain = props.domain
    const id = props.id
    axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${identifier}&domain=${domain}&id=${id}`)
        .then(res => {
            let tempdate = new Date(res.data.date)
            setTime(new Date(Date.UTC(tempdate.getFullYear(),tempdate.getMonth(),tempdate.getDate(),tempdate.getHours()-1,tempdate.getMinutes(),tempdate.getSeconds())).toLocaleString())
            setFrom(res.data.from)
            setSubject(res.data.subject)
            setTextBody(res.data.textBody)
        })
        .catch(err => {
            console.log(err)
        })

    return (
        <div className='mx-5 my-2'>
            <Card>
                <Card.Body className='mx-2 my-2'>
                    <Card.Title>{from}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Arrived: {time}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Subject: {subject}</Card.Subtitle>
                    <hr />
                    <ReactMarkdown>{textBody}</ReactMarkdown>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Mail
