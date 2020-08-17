import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue, updatePatient } from "../state";
import { Container, Icon, Header } from "semantic-ui-react";


import { Gender, Patient, Diagnosis, } from "../types";
import { apiBaseUrl } from '../constants';

type GenderIconCode = "mars" | "venus" | "genderless";

const PatientInfoPage: React.FC = () => {
    const [diagnoses, setDiagnoses] = useState<Map<string, string>>();
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const findPatient = patients[id];

    React.useEffect(() => {
        const fetchDiagnoses = async () => {
            try {
                const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
                    `${apiBaseUrl}/diagnoses`
                );
                const diagnoseMap = new Map();
                diagnosesFromApi.map(n => diagnoseMap.set(n.code, n.name));
                setDiagnoses(diagnoseMap);
            } catch (e) {
                console.error(e);
            }
        };
        fetchDiagnoses();
    }, []);

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
                <Header as="h2">{findPatient.name}<Icon name={whichGenderIcon(findPatient.gender)} size='large' /></Header>
                {!findPatient.ssn ? <p></p> : <p>{`ssn : ${findPatient.ssn}`}</p>}
                <p>{`occupation : ${findPatient.occupation}`}</p>
                
                {findPatient.entries && findPatient.entries.length > 0 && diagnoses
                    ? <div>
                        <Header as="h3">entries</Header>
                        {findPatient.entries.map((n) => {
                            if (n.diagnosisCodes) {
                                return (
                                    <div key={n.description}>
                                        <p key={n.description}>{n.date} {n.description}</p>
                                        {n.diagnosisCodes.map( code => 
                                            <li key={code}>{code} {diagnoses.has(code) ? diagnoses.get(code) : null}</li>
                                        )}
                                    </div>
                                );
                            }
                            return <p key={n.description}>{n.date} {n.description}</p>;
                        })}
                    </div>
                    : null
                }
            </Container>
        </div>
    );
};

export default PatientInfoPage;