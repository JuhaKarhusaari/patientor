import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue, updatePatient } from "../state";

import { Container, Icon, Header, Button, } from "semantic-ui-react";
import EntryDetails from "../components/EntryDetails";
import AddEntryModal from "../AddEntryModal";


import { Gender, Patient, Entry } from "../types";
import { AddEntryValues } from "../types";
import { apiBaseUrl } from '../constants';

type GenderIconCode = "mars" | "venus" | "genderless";

const PatientInfoPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const { id } = useParams<{ id: string }>();
    const findPatient = patients[id];

    // Reset error message & hide notification 
    React.useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(undefined);
            }, 5000);
        }
    }, [error]);

    React.useEffect(() => {
        axios.get<void>(`${apiBaseUrl}/ping`);
        if (typeof findPatient !== 'undefined'){
            if (!findPatient.ssn) {
                const fetchPatientList = async () => {
                    try {
                        const { data: patientDataFromApi } = await axios.get<Patient>(
                            `${apiBaseUrl}/patients/${id}`
                        );
                        dispatch(updatePatient(patientDataFromApi));
                    } catch (e) {
                        console.error(e);
                    }
                };
                fetchPatientList();
            }
        }
    }, [dispatch, findPatient, id]);

    // AddEntryModal handle
    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    // Add new entry
    const submitNewEntry = async (values: AddEntryValues) => {
        try {
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            if (typeof findPatient !== 'undefined' && findPatient.entries) {
                const updatedPatient = {
                    ...findPatient,
                    entries: findPatient.entries.concat(newEntry)
                };
                dispatch(updatePatient(updatedPatient));
            }
           
        } catch (e) {
            setError(`Error. ${e.response.data}`);
            console.error(e.message + ".", e.response.data);
        }

    };

    // Gender icon handle
    const whichGenderIcon = (gender: Gender): GenderIconCode => {
        switch (gender) {
            case Gender.Male:
                return "mars";
            case Gender.Female:
                return "venus";
            case Gender.Other:
                return "genderless";
            default:
                return "genderless";
        }
    };

    if (typeof findPatient === 'undefined'){
        return <div>Loading..</div>;
    }

    return (
        <div className="App">
            <Container textAlign="left">
                <Header as="h2">{findPatient.name}<Icon name={whichGenderIcon(findPatient.gender)} size='large' /></Header>
                {!findPatient.ssn ? <p></p> : <p>{`ssn : ${findPatient.ssn}`}</p>}
                <p>{`occupation : ${findPatient.occupation}`}</p>
                
                {findPatient.entries && findPatient.entries.length > 0 
                    ? <div>
                        <Header as="h3">entries</Header>
                        {findPatient.entries.map((n) => {
                            return (
                                <EntryDetails 
                                    key={n.description}
                                    entry={n}
                                />
                            );
                        })}
                    </div>
                    : null
                }
                <AddEntryModal 
                    modalOpen={modalOpen}
                    error={error}
                    onClose={closeModal}
                    onSubmit={submitNewEntry}
                />
                <Button onClick={() => openModal()}>Add New Entry</Button>
            </Container>
        </div>
    );
};

export default PatientInfoPage;