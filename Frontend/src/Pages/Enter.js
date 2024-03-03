import React, { useState } from "react";
import {Form} from "react-router-dom"
import TextInput from "../Components/InputField/TextInput";
import PasswordInput from "../Components/InputField/PasswordInput";
import { FaUser } from "react-icons/fa6";
import { HiLockClosed } from "react-icons/hi";
import OR from "../Components/Other/OR";
import CircleCheckbox from "../Components/Checkbox/CircleCheckbox";
import ContinueWithGoogleButton from "../Components/Button/ContinueWithGoogleButton";
import SubmitButton from "../Components/Button/SubmitButton";

export async function action({ request }){
  const formData = await request.formData()
  const emailOrUsername = formData.get("emailOrUsername")
  const password = formData.get("password")
  const rememberMe = formData.get("rememberMe")
  console.log(emailOrUsername, password, rememberMe)
  return null
}
function Enter() {
  return (
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
  );
}

export default Enter;