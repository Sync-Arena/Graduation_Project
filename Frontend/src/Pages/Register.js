import React, { useState } from "react";
import { Form, useNavigate } from 'react-router-dom'
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
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

function Register() {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  let navigate = useNavigate();

  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    userName: "",
    password: "",
    passwordConfirm: ""
  })

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      let p = { ...registerFormData, ["role"]: "admin" }
      console.log(JSON.stringify(p))
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/users/signup`,
        JSON.stringify(p),
        {
          headers: { 'Content-Type': 'application/json' },
        })
      console.log(res)
      navigate('/enter')
    } catch (err) {
      console.error(err.response.data)
      setMessage(`${err.request.status} : ${err.response.data.message}`)
    }
    finally {
      setLoading(false)
    }
  }
  function handleChange(e) {
    const { name, value } = e.target
    setRegisterFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <div className="h-screen">
      <div className="flex items-center justify-center mt-12">
        {message &&
          <div className="flex items-center justify-center bg-red-800 text-white font-bold px-16 py-3 rounded-md" role="alert">
            <FontAwesomeIcon icon={faCircleExclamation} className='text-2xl mr-3' />
            <p>{message}</p>
          </div>
        }
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="flex-1 w-80 flex flex-col">
            <TextInput
              placeholder="Username"
              icon={<FaUser />}
              name="userName"
              value={registerFormData.userName}
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
              name="passwordConfirm"
              value={registerFormData.passwordConfirm}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="mb-6 bg-gradient-to-r from-main_heighlight_color_dark to-main_link_color_dark border-0 rounded-md block w-full p-2 text-main_font_color_dark font-semibold"
              style={loading ? { backgroundImage: "none", backgroundColor: "#393939" } : null}
              disabled={loading}
            >
              {loading ? "Signing UP..." : "Sign UP"}
            </button>
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
    </div>
  );
}

export default Register;
