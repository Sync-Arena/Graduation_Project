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

export async function action({ request }){
  const formData = await request.formData()
  const username = formData.get("username")
  const email = formData.get("email")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")
  console.log(username, email, password, confirmPassword)
  return null;
}

function Register() {
  return (
    <div className="h-full flex flex-col justify-center items-center mt-10">
      <Form method="post" autocomplete="off" replace>
        <div className="flex-1 w-80 flex flex-col">
          <TextInput
            placeholder="Username"
            icon={<FaUser />}
            name="username"
          />
          <EmailInput
            placeholder="Email"
            icon={<MdEmail />}
            name="email"
          />
          <PasswordWithPopover
            placeholder="Password"
            icon={<HiLockClosed />}
            name="password"
          />
          <PasswordInput
            placeholder="Confirm Password"
            icon={<HiLockClosed />}
            name="confirmPassword"
          />
          <SubmitButton title={"Sign Up"} />
          <OR />
          <ContinueWithGoogleButton />
        </div>
      </Form>
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
