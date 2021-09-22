import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import updateSchema from "./update-schema";

import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { getAccount, updateAccount } from "../../../api/account-api";

export default function Account() {
  const [loadStatus, setLoadStatus] = useState({
    isError: false,
    isLoading: true,
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      gender: "Male",
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
        username: values.username,
        gender: values.gender,
        profilePicture: values.profilePicture,
        firstName: values.firstName,
        lastName: values.lastName,
        birthDate: values.birthDate,
        email: values.email,
        country: values.country,
      };
      console.log(data);
      await updateAccount(data);
    },
  });

  async function loadAccount() {
    try {
      const { data } = await getAccount();
      formik.setValues({
        username: data.data.username || "",
        gender: "Male" || "",
        profilePicture: data.data.profilePicture || "",
        firstName: data.data.firstName || "",
        lastName: data.data.lastName || "",
        birthDate: data.data.birthDate || "01/02/1992",
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
    <div className="mx-5">
      <div className="row">
        <div className="col-5">
          <h1 className="fnt-jumbo">Username</h1>
          <p className="fnt-subtitle-bold mb-0 lh-1">ACOUNT DETAILS</p>
          <p className="fnt-subtitle-light mb-0 lh-1">PASSWORD RECOVERY</p>
          <p className="fnt-subtitle-light mb-0 lh-1">PASSWORD UPDATE</p>
          <p className="fnt-subtitle-light mb-0 lh-1">LOGOUT</p>
        </div>
        <div className="col-7 clr-light">
          <h1 className="fnt-subtitle-bold mb-4">Account details</h1>
          <form onSubmit={formik.handleSubmit} className="row">
            <Input
              classNames="col-4"
              type="text"
              label="USERNAME"
              id="username"
              value={formik.values.username}
              errorMessage={formik.errors.username}
              hasErrorMessage={formik.touched.username}
              placeholder={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loadStatus.isLoading || loadStatus.isError}
            />
            <select
              label="GENDER"
              className="custom-select col-4"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="gender"
              disabled={loadStatus.isLoading || loadStatus.isError}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <Input
              classNames="col-4"
              type="file"
              label="PROFILE IMAGE"
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
              classNames="col-4"
              type="text"
              label="FIRST NAME"
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
              classNames="col-4"
              type="text"
              label="LAST NAME"
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
              classNames="col-4"
              type="date"
              label="BIRTHDATE"
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
              classNames="col-8"
              type="email"
              label="EMAIL"
              id="email"
              value={formik.values.email}
              errorMessage={formik.errors.email}
              hasErrorMessage={formik.touched.email}
              placeholder={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loadStatus.isLoading || loadStatus.isError}
            />
            <select
              className="country-select col-4"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="country"
              disabled={loadStatus.isLoading || loadStatus.isError}
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
              <Button submitButton>Edit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
