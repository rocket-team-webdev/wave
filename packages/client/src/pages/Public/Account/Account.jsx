import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import updateSchema from "./update-schema";

import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Select from "../../../components/Select";

import { PUBLIC } from "../../../constants/routes";
import { getAccount, updateAccount } from "../../../api/account-api";
import AccountSideBar from "../../../components/AccountSideBar";
import FormWrapper from "../../../components/FormWrapper";
import DeleteModal from "../../../components/DeleteModal";

export default function Account() {
  const history = useHistory();
  const [loadStatus, setLoadStatus] = useState(false);
  const userState = useSelector((state) => state.user);

  const handleDeleteAccount = async () => {
    history.push({
      pathname: PUBLIC.REAUTHENTICATE,
      state: { referrer: history.location.pathname },
    });
  };

  const formik = useFormik({
    initialValues: {
      profilePicture: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
      country: "",
    },
    validationSchema: updateSchema,
    onSubmit: async (updateState) => {
      setLoadStatus(true);
      try {
        const formData = new FormData();
        formData.append("profilePicture", updateState.profilePicture);
        formData.append("lastName", updateState.lastName);
        formData.append("firstName", updateState.firstName);
        formData.append("birthDate", updateState.birthDate);
        formData.append("email", updateState.email);
        formData.append("country", updateState.country);

        await updateAccount(formData);
        history.go(0);
        toast("Account updated successfully!", { type: "success" });
      } catch (error) {
        toast(error.message, { type: "error" });
      }
      setLoadStatus(false);
    },
  });

  async function loadAccount() {
    setLoadStatus(true);
    try {
      const { data } = await getAccount();
      formik.setValues({
        profilePicture: data.data.profilePicture || "",
        firstName: data.data.firstName || "",
        lastName: data.data.lastName || "",
        birthDate: data.data.birthDate.substr(0, 10) || "",
        email: data.data.email || "",
        country: data.data.country || "",
      });
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus(false);
  }

  useEffect(() => {
    loadAccount();
  }, []);

  const profilePictureOnChange = async (event) => {
    formik.setFieldValue("profilePicture", event.target.files[0]);
  };

  return (
    <Layout>
      <div className="row p-0 m-0 col col-12 pb-5 pb-sm-0">
        <div className="col col-12 col-lg-6 ps-3 ps-sm-0">
          <AccountSideBar />
        </div>

        <div className="col col-12 col-lg-6 pe-3 pe-sm-0">
          <FormWrapper
            formTitle="Account details"
            img={userState.profilePicture}
          >
            <form onSubmit={formik.handleSubmit} className="row">
              <Input
                classNames="col-12 col-md-6"
                type="text"
                label="First Name"
                id="firstName"
                value={formik.values.firstName}
                errorMessage={formik.errors.firstName}
                hasErrorMessage={formik.touched.firstName}
                placeholder={formik.values.firstName}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                disabled={loadStatus}
              />
              <Input
                classNames="col-12 col-md-6"
                type="text"
                label="Last Name"
                id="lastName"
                value={formik.values.lastName}
                errorMessage={formik.errors.lastName}
                hasErrorMessage={formik.touched.lastName}
                placeholder={formik.values.lastName}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                disabled={loadStatus}
              />
              <Input
                classNames="col-12 col-md-6"
                type="date"
                label="Birthdate"
                id="birthDate"
                value={formik.values.birthDate}
                errorMessage={formik.errors.birthDate}
                hasErrorMessage={formik.touched.birthDate}
                placeholder={formik.values.birthDate}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                disabled={loadStatus}
              />
              <Input
                classNames="col-12 col-md-6"
                label="Profile Picture"
                id="profilePicture"
                type="file"
                placeholder="Choose your file"
                handleChange={profilePictureOnChange}
                handleBlur={formik.handleBlur}
                errorMessage={formik.errors.profilePicture}
                hasErrorMessage={formik.touched.profilePicture}
                disabled={loadStatus}
              />
              <Input
                classNames="col-12 col-md-8"
                type="email"
                label="Email"
                id="email"
                value={formik.values.email}
                errorMessage={formik.errors.email}
                hasErrorMessage={formik.touched.email}
                placeholder={formik.values.email}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                disabled={loadStatus}
              />
              <Select
                classNames="col-12 col-md-4"
                label="Country"
                id="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loadStatus}
                options={[
                  "Spain",
                  "Argentina",
                  "Morocco",
                  "France",
                  "Italy",
                  "Germany",
                  "USA",
                  "Mexico",
                  "Catalonia",
                ]}
              />
              <div className="d-flex justify-content-between mt-5">
                <div className="col-6 d-flex justify-content-start">
                  <Button
                    data-bs-toggle="modal"
                    data-bs-target="#deleteUserModal"
                    isDanger
                  >
                    Delete account
                  </Button>
                </div>
                <div className="col-6 d-flex justify-content-end pe-0">
                  <Button submitButton>Save </Button>
                </div>
              </div>
            </form>
          </FormWrapper>
        </div>

        <DeleteModal
          id="deleteUserModal"
          modalTitle="Removing user"
          modalBody="Are you sure you want to delete this user?"
          handleSubmit={handleDeleteAccount}
        />
      </div>
    </Layout>
  );
}
