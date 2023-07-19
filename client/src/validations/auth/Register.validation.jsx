import React from 'react'
import * as yup from "yup";

export function RegisterSchema() {
  return yup.object({
    name:yup.string().required("Name is Required!"),
    email:yup.string().email("Enter Valid Email!").required("Email is Required!"),
    username:yup.string().required("Username is Required"),
    password:yup.string().min(8,"Password Must be 8 Characters!")
  }).required()
}
