import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import updateSchema from "./update-schema";

import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { getAccount, updateAccount } from "../../../api/account-api";

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
      console.log("accountData", accountData);
      console.log(data);
      // setLoadStatus({ isError: false, isLoading: false });
    } catch (error) {
      // setLoadStatus({ isError: true, isLoading: false, error: error });
    }
  }

  useEffect(() => {
    loadAccount();
    console.log("Setting initial values");
  }, []);

  const formik = useFormik({
    initialValues: {
      username: accountData.username,
      gender: "",
      profilePicture: accountData.profilePicture,
      firstName: accountData.firstName,
      lastName: accountData.lastName,
      birthDate: accountData.birthDate,
      email: accountData.email,
      country: accountData.country,
    },
    validationSchema: updateSchema,
    onSubmit: async (values) => {
      console.log(values);
      // eslint-disable-next-line
      const { data } = await updateAccount();
    },
  });

  return (
    <div className="mx-5">
      <div className="row">
        <div className="col-5">
          <h1 className="fnt-jumbo">Username</h1>
          <p className="fnt-subtitle-bold mb-0 lh-1">ACOUNT DETAILS</p>
          <p className="fnt-subtitle-light mb-0 lh-1">PASSWORD RECOVERY</p>
          <p className="fnt-subtitle-light mb-0 lh-1">PASSWORD UPDATE</p>
          <p className="fnt-subtitle-light mb-0 lh-1">LOGOUT</p>
        </div>
        <div className="col-7">
          <h1 className="fnt-page-title mb-4">Account details</h1>
          <form onSubmit={formik.handleSubmit} className="row">
            <Input
              classNames="col-4"
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
              className="gender-select col-4"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="gender"
            >
              <option value="Spain">Male</option>
              <option value="Italy">Female</option>
            </select>

            <Input
              classNames="col-4"
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
            <Input
              classNames="col-4"
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
              classNames="col-4"
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
              classNames="col-4"
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
            <Input
              classNames="col-8"
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
              className="country-select col-4"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="country"
            >
              <option value="Spain">Spain</option>
              <option value="Argentina">Argentina</option>
              <option value="Morocco">Morocco</option>
              <option value="France">France</option>
              <option value="Italy">Italy</option>
              <option value="Germany">Germany</option>
              <option value="USA">USA</option>
              <option value="Mexico">Mexico</option>
              <option value="Catalonia">Catalonia</option>
            </select>
            <div className="col-12 text-end mt-5">
              <Button>Edit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
