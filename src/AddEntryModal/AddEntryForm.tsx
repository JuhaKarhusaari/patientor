import React from "react";
import { Grid, Button, Container, Dropdown, DropdownProps } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { useStateValue } from "../state";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { AddEntryValues, EntryType } from "../types";
import { EntryFields, entryValidateHelper, initialValues } from "./EntryFormUtils";

interface Props {
    onSubmit: (values: AddEntryValues) => void;
    onCancel: () => void;
}

// structure of a single option
export type EntryOption = {
    value: EntryType;
    label: string;
};

const entryOptions: EntryOption[] = [
    { value: EntryType.Hospital, label: "Hospital" },
    { value: EntryType.HealthCheck, label: "HealthCheck" },
    { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" }
];


const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();
    const [ entryType, setEntryType ] = React.useState<EntryType | undefined>();

    const onChange = (
        _event: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps
    ) => {
        setEntryType(data.value as EntryType);
    };
    if (!entryType) {
        return (
            <Container>
                <Dropdown
                    placeholder='Select entry type'
                    fluid
                    selection
                    closeOnChange
                    options={entryOptions}
                    onChange={onChange}
                />
            </Container>
        );
    }

    return (
        <Formik
            initialValues={initialValues(entryType)}
            onSubmit={onSubmit}
            validate={values => {
               entryValidateHelper(values);
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="House"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <EntryFields entry={entryType} />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;