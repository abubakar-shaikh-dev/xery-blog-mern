import React from 'react'
import * as yup from "yup";

export function LoginSchema() {
  return yup.object({
    email:yup.string().email("Enter Valid Email!").required("Email is Required!"),
    password:yup.string().min(8,"Password Must be 8 Characters!")
  }).required()
}
