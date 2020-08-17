import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue, updatePatient } from "../state";
import { Container, Icon, Header } from "semantic-ui-react";


import { Gender, Patient } from "../types";
import { apiBaseUrl } from '../constants';

type GenderIconCode = "mars" | "venus" | "genderless";


const PatientInfoPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const findPatient = patients[id];

    React.useEffect(() => {
        console.log("Patient Info");
        axios.get<void>(`${apiBaseUrl}/ping`);
        if (typeof findPatient !== 'undefined'){
            if (!findPatient.ssn) {
                const fetchPatientList = async () => {
                    try {
                        const { data: patientDataFromApi } = await axios.get<Patient>(
                            `${apiBaseUrl}/patients/${id}`
                        );
                        console.log(patientDataFromApi);
                        dispatch(updatePatient(patientDataFromApi));
                    } catch (e) {
                        console.error(e);
                    }
                };
                fetchPatientList();
        }
        
        }
    }, [dispatch, findPatient, id]);

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
                <Header as="h3">{findPatient.name}<Icon name={whichGenderIcon(findPatient.gender)} size='large' /></Header>
                {!findPatient.ssn ? <p></p> : <p>{`ssn : ${findPatient.ssn}`}</p>}
                <p>{`occupation : ${findPatient.occupation}`}</p>
                <p>{`data of birth : ${findPatient.dateOfBirth}`}</p>
            </Container>
        </div>
    );
};

export default PatientInfoPage;