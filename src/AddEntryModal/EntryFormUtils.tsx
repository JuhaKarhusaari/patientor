import React from "react";
import { Field } from "formik";
import { TextField, NumberField } from "../AddPatientModal/FormField";
import { AddEntryValues, EntryType } from "../types";

export const entryValidateHelper = (values: AddEntryValues) => {
    const requiredError = "Field is required";
    const errors: { [field: string]: string } = {};
    if (!values.date) {
        errors.date = requiredError;
    }
    if (!values.description) {
        errors.description = requiredError;
    }
    if (!values.specialist) {
        errors.specialist = requiredError;
    }
    if (values.type === "Hospital") {
        if (!values.discharge.date || !values.discharge.criteria) {
            errors.discharge = requiredError;
        }
    }
    if (values.type === "HealthCheck") {
        if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
        }
    }
    if (values.type === "OccupationalHealthcare") {
        if (!values.employerName) {
            errors.employerName = requiredError;
        }
    }
    return errors;
};

export const initialValues = (entry: EntryType): AddEntryValues => {
    switch (entry){
        case "Hospital":
            return {
                type: "Hospital",
                description: "",
                diagnosisCodes: [],
                date: "",
                specialist: "",
                discharge: { date: "", criteria: "" }
            };
        case "HealthCheck":
            return {
                type: "HealthCheck",
                description: "",
                diagnosisCodes: [],
                date: "",
                specialist: "",
                healthCheckRating: 0
            };
        case "OccupationalHealthcare":
            return {
                type: "OccupationalHealthcare",
                description: "",
                diagnosisCodes: [],
                date: "",
                specialist: "",
                employerName: "",
                sickLeave: { startDate: "", endDate: "" }
            };
        default:
            throw new Error("Something went wrong");
    }
};

export const EntryFields = ({entry}: {entry: EntryType}) => {
    switch (entry) {
        case "Hospital":
            return (
                <>
                    <h3>Discharge</h3>
                    <Field
                        label="Date"
                        placeholder="YYYY-MM-DD"
                        name="discharge.date"
                        component={TextField}
                    />
                    <Field
                        label="Criteria"
                        placeholder="type criteria..."
                        name="discharge.criteria"
                        component={TextField}
                    />
                </>
            );
        case "HealthCheck":
            return (
                <>
                    <Field
                        label="Health rating"
                        placeholder='0'
                        name="healthCheckRating"
                        component={NumberField}
                    />
                </>
            );
        case "OccupationalHealthcare":
            return (
                <>
                    <Field
                        label="Employer name"
                        placeholder='...'
                        name="employerName"
                        component={TextField}
                    />
                    <h3>Sick leave</h3>
                    <Field
                        label="Start"
                        placeholder="YYYY-MM-DD"
                        name="sickLeave.startDate"
                        component={TextField}
                    />
                    <Field
                        label="End"
                        placeholder="type criteria..."
                        name="sickLeave.endDate"
                        component={TextField}
                    />
                </>
            );
        default:
            throw new Error("Something went wrong");
    }
};
