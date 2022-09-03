import React, { useState } from 'react'
import { FormControl, FormLabel, Input, Button, Heading, Alert, AlertIcon, Text } from "@chakra-ui/react"
import axios from "axios"
import {Link} from "react-router-dom"

export const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState()
    const [success, setSuccess] = useState(false)

    const handlechange = ({currentTarget:input}) => {
        setData({ ...data, [input.name]: input.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
           
            const {data:res} = await axios("http://localhost:5000/login",{
              method:"post",
              data
            })
            console.log(res.message)
            setSuccess("Logged-In Successfully")
            localStorage.setItem("token",res.data)
            window.location.href="/admin"
        } catch (error) {
            if(error.response.status <= 500){
                setSuccess("Logged-In Successfully !");
                setTimeout(()=>{
                  setSuccess("")
                  window.location.href="/admin"
                },2000)
            }
            else if (error.response.status === 404){
                setError("Invalid email or password !")
                setTimeout(()=>{
                    setError("")
                },2000)
            }
            else{
                setError("error Found")
            }
        }
        
    }
    return (
        <div style={{ width: "40%", margin: "auto", marginTop: "40px" }}>
            <Heading style={{ color: "teal", display: "flex", lineHeight: "3" }}>Login-Form</Heading>
            {error && <Alert status='error'>
                <AlertIcon />
                {error}
            </Alert>}
            {success && <Alert status='success'>
                <AlertIcon />
                {success}
            </Alert>}
            <form onSubmit={handleSubmit}>
            <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type='email' placeholder='Email' name="email" onChange={handlechange} value={data.email} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type='password' placeholder='Password' name="password" onChange={handlechange} value={data.password} />
            </FormControl>
            <Button style={{ display: "flex", marginTop: "30px" }} type="submit" colorScheme='teal' >
                Login
            </Button>
            <Text> If User Not Register ? <Link style={{color:"blue"}} to="/">Register Now</Link></Text>
            </form>
        </div>
    )
}
