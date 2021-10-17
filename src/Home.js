import { render } from '@testing-library/react'
import React, { useState } from 'react'
import axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap'
import './Home.css'
import christmas from './christmas.gif'


const Home = (props) => {
   const [formData, setFormData] = useState({
       email: '',
       description: ''
   })

   const [result, setResult] = useState(null)

   const {email, description} = formData

   const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)

        axios
        .post('/send', {...formData})
        .then(response => {
            setResult(response.data)
            setFormData({
                email:'',
                description: ''
            })
        })
        .catch(() => {
            setResult({
                success:false,
                message: 'Something went wrong.Try again'
            })
        })
            
    }



    return (
        <Container className='mt-5 cont'>
            {result && (
                <p className={`${result.success ? 'success' : 'error'}`}>{result.message}</p>
            )}

            <Form className='w-50 mx-auto form' onSubmit={handleSubmit} method='POST'>
                <h2 className='mx-auto mb-5 mainHeader'> Hi Friend, what would you like for christmas?<span><img src={christmas} alt='christmas tree' className='gif'/></span></h2>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control size ='lg' type="email" placeholder="put an email that has your name or nothing for you" name='email' value ={email} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>What would you like?</Form.Label>
                    <Form.Control as="textarea" rows={3} name='description' value={description} onChange={handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
  </Button>
            </Form>
        </Container>
    )
}

export default Home