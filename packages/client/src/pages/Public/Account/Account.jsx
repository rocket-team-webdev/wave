import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";

import updateSchema from "./update-schema";

import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Select from "../../../components/Select";

import { PUBLIC } from "../../../constants/routes";
import { getAccount, updateAccount } from "../../../api/account-api";
import AccountSideBar from "../../../components/AccountSideBar";
import FormWrapper from "../../../components/FormWrapper";

export default function Account() {
  const history = useHistory();
  const [loadStatus, setLoadStatus] = useState({
    isError: false,
    isLoading: true,
  });

  const handleDeleteAccount = async () => {
    history.push(PUBLIC.REAUTHENTICATE);
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
    onSubmit: async (values) => {
      const data = {
        profilePicture: values.profilePicture,
        firstName: values.firstName,
        lastName: values.lastName,
        birthDate: values.birthDate,
        email: values.email,
        country: values.country,
      };
      await updateAccount(data);
    },
  });

  async function loadAccount() {
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
      setLoadStatus({ isError: false, isLoading: false });
    } catch (error) {
      setLoadStatus({ isError: true, isLoading: false, error: error });
    }
  }

  useEffect(() => {
    loadAccount();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-6 pt-2">
          <AccountSideBar />
        </div>

        <div className="col-6">
          <FormWrapper formTitle="Account details">
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loadStatus.isLoading || loadStatus.isError}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loadStatus.isLoading || loadStatus.isError}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loadStatus.isLoading || loadStatus.isError}
              />
              <Input
                classNames="col-12 col-md-6"
                type="file"
                label="Profile Image"
                id="profileImage"
                value={formik.values.profileImage}
                errorMessage={formik.errors.profileImage}
                hasErrorMessage={formik.touched.profileImage}
                placeholder={formik.values.profileImage}
                onChange={formik.profileImage}
                onBlur={formik.profileImage}
                disabled={loadStatus.isLoading || loadStatus.isError}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loadStatus.isLoading || loadStatus.isError}
              />
              <Select
                classNames="col-12 col-md-4"
                label="Country"
                id="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loadStatus.isLoading || loadStatus.isError}
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
                  <Button handleClick={handleDeleteAccount} isDanger>
                    Delete account
                  </Button>
                </div>
                <div className="col-6 d-flex justify-content-end pe-0">
                  <Button submitButton>Save </Button>
                </div>
              </div>
            </form>
            {loadStatus.isLoading && <h3>Loading...</h3>}
            {!loadStatus.isLoading && loadStatus.isError && (
              <h3>Account error: {loadStatus.isError}</h3>
            )}
          </FormWrapper>
        </div>
      </div>
    </Layout>
  );
}
