import React, { useState } from "react";
import {Form} from 'react-router-dom'
import TextInput from "../Components/InputField/TextInput";
import PasswordInput from "../Components/InputField/PasswordInput";
import EmailInput from "../Components/InputField/EmailInput";
import PasswordWithPopover from "../Components/InputField/PasswordWithPopover";
import { FaUser } from "react-icons/fa6";
import { HiLockClosed } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import OR from "../Components/Other/OR";
import ContinueWithGoogleButton from "../Components/Button/ContinueWithGoogleButton";
import SubmitButton from "../Components/Button/SubmitButton";

function Register() {
  const [registerFormData, setRegisterFormData] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  
  function handleSubmit(e) {
    e.preventDefault()
    console.log(registerFormData)
  }
  function handleChange(e) {
    const { name, value} = e.target
    setRegisterFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <div className="h-full flex flex-col justify-center items-center mt-10">
      <form onSubmit={handleSubmit} autocomplete="off">
        <div className="flex-1 w-80 flex flex-col">
          <TextInput
            placeholder="Username"
            icon={<FaUser />}
            name="username"
            value={registerFormData.username}
            onChange={handleChange}
          />
          <EmailInput
            placeholder="Email"
            icon={<MdEmail />}
            name="email"
            value={registerFormData.email}
            onChange={handleChange}
          />
          <PasswordWithPopover
            placeholder="Password"
            icon={<HiLockClosed />}
            name="password"
            value={registerFormData.password}
            onChange={handleChange}
          />
          <PasswordInput
            placeholder="Confirm Password"
            icon={<HiLockClosed />}
            name="confirmPassword"
            value={registerFormData.confirmPassword}
            onChange={handleChange}
          />
          <SubmitButton title={"Sign Up"} />
          <OR />
          <ContinueWithGoogleButton />
        </div>
      </form>
      <p className="text-main_font_color_dark mx-auto text-xs mt-12 md:text-base max-w-sm md:max-w-lg text-center">
        Shoubra, Benha University engineers are building a collaborative Online
        Judge System, emphasizing teamwork and skill development. See our{" "}
        <span className="text-main_link_color_dark">privacy policy</span> for
        details.
      </p>
    </div>
  );
}

export default Register;
