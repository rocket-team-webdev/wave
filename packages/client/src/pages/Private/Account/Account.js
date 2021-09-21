import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import updateSchema from "./update-schema";

import Input from "../../../components/Input";

import { getAccount } from "../../../api/account-api";

export default function Account() {
  const [accountData, setAccountData] = useState([]);
  // const [loadStatus, setLoadStatus] = useState({
  //   isError: false,
  //   isLoading: true,
  // });

  async function loadAccount() {
    try {
      const { data } = await getAccount();
      setAccountData(data, accountData);
      // setLoadStatus({ isError: false, isLoading: false });
    } catch (error) {
      // setLoadStatus({ isError: true, isLoading: false, error: error });
    }
  }

  useEffect(() => {
    loadAccount();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: accountData.username,
      gender: accountData.gender,
      profilePicture: "",
      firstName: accountData.firstName,
      lastName: accountData.lastName,
      birthDate: accountData.birthDate,
      email: accountData.email,
      country: accountData.country,
    },
    validationSchema: updateSchema,
    onSubmit: async () => {
      // eslint-disable-next-line
      //Update function
    },
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-5">
          <h1>Username</h1>
          <p>ACOUNT DETAILS</p>
          <p>PASSWORD RECOVERY</p>
          <p>PASSWORD UPDATE</p>
          <p>LOGOUT</p>
        </div>
        <div className="col-7">
          <h1>Account details</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex">
              <Input
                type="text"
                label="USERNAME"
                id="username"
                value={formik.values.username}
                errorMessage={formik.errors.username}
                hasErrorMessage={formik.touched.username}
                placeholder={accountData.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <select
                label="GENDER"
                className="gender-select"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="gender"
              >
                <option value="Spain">Male</option>
                <option value="Italy">Female</option>
              </select>

              <Input
                type="file"
                label="PROFILE IMAGE"
                id="profileImage"
                value={formik.values.profileImage}
                errorMessage={formik.errors.profileImage}
                hasErrorMessage={formik.touched.profileImage}
                placeholder={accountData.profileImage}
                onChange={formik.profileImage}
                onBlur={formik.profileImage}
              />
            </div>
            <div className="d-flex">
              <Input
                type="text"
                label="FIRST NAME"
                id="firstName"
                value={formik.values.firstName}
                errorMessage={formik.errors.firstName}
                hasErrorMessage={formik.touched.firstName}
                placeholder={accountData.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Input
                type="text"
                label="LAST NAME"
                id="lastName"
                value={formik.values.lastName}
                errorMessage={formik.errors.lastName}
                hasErrorMessage={formik.touched.lastName}
                placeholder={accountData.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Input
                type="date"
                label="BIRTHDATE"
                id="birthdate"
                value={formik.values.birthdate}
                errorMessage={formik.errors.birthdate}
                hasErrorMessage={formik.touched.birthdate}
                placeholder={accountData.birthDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="d-flex">
              <Input
                type="email"
                label="EMAIL"
                id="email"
                value={formik.values.email}
                errorMessage={formik.errors.email}
                hasErrorMessage={formik.touched.email}
                placeholder={accountData.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <select
                className="country-select"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="country"
              >
                <option value="Spain">Spain</option>
                <option value="Italy">Italy</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Netherlands">Netherlands</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
