import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import courseSlice, {
  getCourseByUserID,
  startLoading,
} from "../redux/slice/courseSlice";
import { errorPrefix, isEmpty } from "@firebase/util";
import UpdateProfileModal from "./UpdateProfileModal";
import { createProfile, updateProfile } from "../redux/slice/loginSlice";
import LoadingScreen from "./LoadingScreen";

export default function Setting() {
  const data = useSelector((state) => state?.courses?.getCourseByUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [selectedUpdateFile, setSelectedUpdateFile] = useState(null);
  const [isOpenEmailUpdate, setIsOpenEmailUpdate] = useState(false);
  const [isOpenPasswordUpdate, setIsOpenPasswordUpdate] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    uploadFile(event.target.files[0]);
  };

  const handleUpdateFileChange = (event, id) => {
    setSelectedUpdateFile(event.target.files[0]);
    UpdateProfileFile(event.target.files[0], id);
  };

  const UpdateProfileFile = async (file, id) => {
    if (file) {
      console.log("file ", file);

      setLoading(true);
      let response = {};

      try {
        const formData = new FormData();
        formData.append("file", file);

        response = await dispatch(updateProfile(formData, id));
        setUploadCompleted(true);
        setLoading(true);
      } catch (error) {
        console.log(error);
        return error;
      }
      setLoading(false);
      return response;
    } else {
      console.log("No file selected.");
    }
  };

  const uploadFile = async (file) => {
    if (file) {
      console.log("Uploading file:", file);

      setLoading(true);
      let response = {};

      try {
        const formData = new FormData();
        formData.append("file", file);

        response = await dispatch(createProfile(formData));

        setUploadCompleted(true);
        setLoading(true);
      } catch (error) {
        response = error;
        console.log(error);
      }
      setLoading(false);
      return response;
    } else {
      console.log("No file selected.");
    }
  };

  const initData = async () => {
    setLoading(true);
    let response = {};
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      response = await dispatch(getCourseByUserID());
    } catch (error) {
      console.log(error);
      response = error;
    }
    setLoading(false);
    return response;
  };

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateEmailClick = () => {
    setIsOpenEmailUpdate(true);
  };

  const handleCloseUpdateEmail = () => {
    setIsOpenEmailUpdate(false);
  };

  const handleUpdatePasswordClick = () => {
    setIsOpenPasswordUpdate(true);
  };

  const handleCLocseUpdatePassword = () => {
    setIsOpenPasswordUpdate(false);
  };

  useEffect(() => {
    initData();
    if (uploadCompleted) {
      setLoading(false);
    }
  }, [uploadCompleted]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
          <main className="px-4 py-0 sm:px-6 lg:flex-auto lg:px-0 lg:py-10">
            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Profile
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>

                <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                  {data?.data?.profile === null ? (
                    <div className="pt-6 sm:flex">
                      <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6 self-center">
                        Profile Picture
                      </dt>
                      <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <img
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                          alt="Profile"
                          height="75px"
                          width="75px"
                          className="rounded-full"
                        />
                        <div>
                          <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                          <label htmlFor="fileInput">
                            <button
                              type="button"
                              className="font-semibold text-indigo-600 hover:text-indigo-500"
                              onClick={() =>
                                document.getElementById("fileInput").click()
                              }
                            >
                              Select Profile Picture
                            </button>
                          </label>
                        </div>
                      </dd>
                    </div>
                  ) : (
                    <div className="pt-6 sm:flex">
                      <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6 self-center">
                        Profile Picture
                      </dt>
                      <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <img
                          src={data?.data?.profile?.profileImage}
                          height="75px"
                          width="75px"
                          className="rounded-full"
                        />
                        <input
                          type="file"
                          id="updateFileInput"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(event) =>
                            handleUpdateFileChange(
                              event,
                              data?.data?.profile?.id
                            )
                          }
                        />
                        <label htmlFor="updateFileInput">
                          <button
                            type="button"
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                            onClick={() =>
                              document.getElementById("updateFileInput").click()
                            }
                          >
                            Update
                          </button>
                        </label>
                      </dd>
                    </div>
                  )}

                  <div>
                    <div className="pt-6 sm:flex">
                      <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                        Full name
                      </dt>
                      <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-gray-900">
                          {data?.data?.username}
                        </div>
                        <button
                          type="button"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                          onClick={handleUpdateClick}
                        >
                          Update
                        </button>
                      </dd>
                    </div>
                    {isModalOpen && (
                      <UpdateProfileModal
                        onClose={handleCloseModal}
                        headerMessage="Update Profile Full Name"
                        infoMessage="Full Name"
                        exampleText="Ryomen Sukuna"
                        type="text"
                      />
                    )}
                  </div>

                  <div>
                    <div className="pt-6 sm:flex">
                      <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                        Email address
                      </dt>
                      <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-gray-900">{data?.data?.email}</div>
                        <button
                          type="button"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                          onClick={handleUpdateEmailClick}
                        >
                          Update
                        </button>
                      </dd>
                    </div>
                    {isOpenEmailUpdate && (
                      <UpdateProfileModal
                        onClose={handleCloseUpdateEmail}
                        headerMessage="Update Email Address"
                        infoMessage="Email"
                        exampleText="sukuna@gmail.com"
                        type="email"
                      />
                    )}
                  </div>

                  <div>
                    <div className="pt-6 sm:flex">
                      <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                        Password
                      </dt>
                      <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-gray-900">****************</div>
                        <button
                          type="button"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                          onClick={handleUpdatePasswordClick}
                        >
                          Update
                        </button>
                      </dd>
                    </div>
                    {isOpenPasswordUpdate && (
                      <UpdateProfileModal
                        onClose={handleCLocseUpdatePassword}
                        headerMessage="Update Password"
                        infoMessage="Password"
                        exampleText=""
                        type="password"
                      />
                    )}
                  </div>
                </dl>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
