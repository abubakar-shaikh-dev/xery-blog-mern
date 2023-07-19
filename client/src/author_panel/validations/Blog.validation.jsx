import * as yup from "yup";

export function BlogSchema() {
  return yup.object({
    title:yup.string().required("Title is Required!"),
    category:yup.string().required("Select a Category!"),
    summary:yup.string().required("Summary is Required!").max(94,"94 Characters are Maximum!"),
    description:yup.string().required("Blog Post Description is Required!")
  }).required()
}
