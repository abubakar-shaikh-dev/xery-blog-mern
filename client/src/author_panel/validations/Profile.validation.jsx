import React from 'react'
import * as yup from "yup";

export function ProfileSchema() {
  return yup.object({
    name:yup.string().required("Enter your Name!"),
    username:yup.string().required("Enter your Username!")
  }).required()
}
