import React,{useState,useRef,useEffect} from "react";
import PanelWrapper from "../partials/PanelWrapper.panel";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar } from "@material-tailwind/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import ImageCropDialog from "../components/ImageCropDialog";
import convertImageToBase64 from "../../helpers/convertImageToBase64.helper";
import compressImage from "../../helpers/compressImage.helper";
import { useSelector,useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { userActions } from "../../redux/slices/userSlice"

//Validation
import { ProfileSchema } from "../validations/Profile.validation";

//Api
import * as api from "../../services/api/api";

export default function Blogs() {

  const dispatch = useDispatch();
  const user = useSelector(state=>state.user)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileSchema()),
  });

  useEffect(() => {
    reset(user);
  }, [user]);

  //PROFILE IMAGE START

  const fileInputRef = useRef(null);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const initData = {
    originalImage: null,
    croppedImage: user.profileImageURL,
  };

  const [selectedImage, setSelectedImage] = useState(initData);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    event.target.value = null;
    convertImageToBase64(file)
      .then((base64Image) => {
        setSelectedImage((prevValue) => {
          return { ...prevValue, originalImage: base64Image };
        });
      })
      .catch((error) => {
        console.error("Error converting image to base64:", error);
      });
  };

  function onCancel() {
    setSelectedImage((prevValue) => {
      return { ...prevValue, originalImage: null };
    });
  }

  function genCroppedImg(croppedImageURL) {
    compressImage(croppedImageURL, 150, 150, 100)
      .then((compressedImage) => {
        setSelectedImage({
          originalImage: null,
          croppedImage: compressedImage,
        });
        // Handle the compressed image here
      })
      .catch((error) => {
        console.error(error);
      });
  }
  //PROFILE IMAGE ENDS

  const onSubmit = (data) => {
    data = { ...data, profileImageURL: selectedImage.croppedImage };

    const response = api.updateUser(data)
    toast.promise(response, {
      loading: "Please wait...",
      success: (data)=>data.msg,
      error: (err)=>err.msg
    },
    {
      success:{
        duration:2000
      },
      error:{
        duration:1000
      }
    });

    response
    .then(()=>{
      api.getUser()
      .then((data)=>{
        //USER DATA IS SET IN USER SLICE
        dispatch(userActions.setUser(data))
        })
    })
  };

  return (
    <PanelWrapper>
      <main className="flex-1">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
          </div>
          <div className="mx-auto max-w-7xl px-4  sm:px-6 md:px-8">
            {/* Replace with your content */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-7 text-black rounded-md shadow-md space-y-8 divide-y p-4 bg-white divide-gray-200"
            >
              <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div className="space-y-6 sm:space-y-5">
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4  sm:border-gray-200 ">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />

                      {selectedImage.originalImage && (
                        <ImageCropDialog
                          imageURL={selectedImage.originalImage}
                          cropInit={selectedImage.crop}
                          zoomInit={selectedImage.zoom}
                          aspectInit={1/1}
                          onCancel={onCancel}
                          genCroppedImg={genCroppedImg}
                        />
                      )}
                      <label
                        htmlFor="photo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Profile Photo
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <div className="mt-5 gap-5 flex flex-col justify-center items-center sm:gap-6 sm:flex-row sm:justify-start">
                          <Avatar
                            src={selectedImage.croppedImage}
                            alt="avatar"
                            size="xxl"
                            className="ring-2 ring-purple-800 border border-black-500"
                          />
                          <button
                            type="button"
                            onClick={handleFileButtonClick}
                            className="flex gap-2 justify-center items-center rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                          >
                            <ArrowUpTrayIcon className="h-5" />

                            <span>Change</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Full Name
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                          type="text"
                          id="name"
                          autoComplete="off"
                          className={`${
                            errors.name
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          } block w-full max-w-lg rounded-md shadow-sm sm:text-sm`}
                          {...register("name")}
                        />
                        {errors.name && (
                          <p
                            className="mt-2 text-sm text-red-600"
                            id="email-error"
                          >
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4  sm:pt-5">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Username
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="off"
                          className={`${
                            errors.username
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          } block w-full max-w-lg rounded-md shadow-sm sm:text-sm`}
                          {...register("username")}
                        />

                        {errors.username && (
                          <p
                            className="mt-2 text-sm text-red-600"
                            id="email-error"
                          >
                            {errors.username.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4  sm:pt-5">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Email address
                      </label>
                      <div className="flex gap-2 items-center text-gray-500 mt-1 sm:col-span-2 sm:mt-0">
                        <span>{user.email}</span>
                        <EnvelopeIcon className="h-6 w-4" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update Profile Details
                  </button>
                </div>
              </div>
            </form>
            {/* /End replace */}
          </div>
        </div>
      </main>
    </PanelWrapper>
  );
}
