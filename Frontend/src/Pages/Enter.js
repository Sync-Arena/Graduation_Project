import React, { useContext, useState } from "react";
import { Form, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom"
import TextInput from "../Components/InputField/TextInput";
import PasswordInput from "../Components/InputField/PasswordInput";
import { FaUser } from "react-icons/fa6";
import { HiLockClosed } from "react-icons/hi";
import OR from "../Components/Other/OR";
import CircleCheckbox from "../Components/Checkbox/CircleCheckbox";
import ContinueWithGoogleButton from "../Components/Button/ContinueWithGoogleButton";
import SubmitButton from "../Components/Button/SubmitButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import AuthContext from "../Context/AuthProvider";
import { login } from "../api";
import axios from 'axios'
export async function action({ request }) {
  const pathname = new URL(request.url).searchParams.get("redirectTo") || "/"
  const formData = await request.formData()
  const emailOrUsername = formData.get("emailOrUsername")
  const password = formData.get("password")
  const rememberMe = formData.get("rememberMe")
    const data = await login(emailOrUsername, password)
    if(data.apiStatus){
      return {data, pathname}
    }
    else{
      return data
    }
}

export async function loader({ request }) {
  return new URL(request.url).searchParams.get("message")
}

function Enter() {
  const { setAuth } = useContext(AuthContext)
  const message = useLoaderData()
  const ac = useActionData()
  const navigate = useNavigate()
  let signboard = null
  if (ac) {
    console.log(ac.pathname)
    if (ac.pathname) {
      console.log('good')
      navigate(ac.pathname)
    }
    else {
      console.log('error')
      signboard = [<div class="flex items-center justify-center bg-red-800 text-white font-bold px-16 py-3 rounded-md" role="alert">
        <FontAwesomeIcon icon={faCircleExclamation} className='text-2xl mr-3' />
        <p>{ac.request.status} : {ac.request.statusText}</p>
      </div>]
    }
  }
  else if (message) {
    console.log('protected')
    signboard = <div class="flex items-center justify-center bg-red-800 text-white font-bold px-16 py-3 rounded-md" role="alert">
      <FontAwesomeIcon icon={faCircleExclamation} className='text-2xl mr-3' />
      <p>{message}</p>
    </div>
  }
  console.log(ac)
  return (
    <>
      <div className="flex items-center justify-center mt-12">
        {signboard}
      </div>
      <div className="h-full flex flex-col justify-center items-center mt-12">
        <Form method="post" autoComplete="off">
          <div className="flex-1 w-80 flex flex-col">
            <TextInput
              placeholder="Email or Username"
              icon={<FaUser />}
              name="emailOrUsername"
            />
            <PasswordInput
              placeholder="Password"
              icon={<HiLockClosed />}
              showPass={1}
              name="password"
            />
            <div className="mb-6 flex justify-between">
              <CircleCheckbox
                label={"Remember Me"}
                name="rememberMe"
              />
              <span className="block text-sm font-medium text-main_link_color_dark">
                Forget Your Password?
              </span>
            </div>
            <SubmitButton title={"Sign In"} />
            <OR />
            <ContinueWithGoogleButton />
          </div>
        </Form>
        <p className="text-main_font_color_dark mx-auto text-xs mt-16 md:text-base max-w-sm md:max-w-lg text-center">
          Shoubra, Benha University engineers are building a collaborative Online
          Judge System, emphasizing teamwork and skill development. See our{" "}
          <span className="text-main_link_color_dark">privacy policy</span> for
          details.
        </p>
      </div>
    </>
  );
}

export default Enter;