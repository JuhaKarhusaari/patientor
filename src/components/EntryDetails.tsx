import React, { useState } from "react";
import axios from "axios";
import { apiBaseUrl } from '../constants';

// Components
import HealthRatingBar from "./HealthRatingBar";
import { Header, Icon } from "semantic-ui-react";

// Types & Utils
import { Entry, Diagnosis } from "../types";
import { assertNever } from "../utils";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    const [diagnoses, setDiagnoses] = useState<Map<string, string>>();

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

    switch (entry.type) {
        case "Hospital":
            return (
                <div className="ui segment" >
                    <Header as="h3">{entry.date} <Icon name="user doctor" /></Header>
                    <p>{entry.description}</p>
                    {entry.diagnosisCodes && diagnoses 
                        ? entry.diagnosisCodes.map(code =>
                            <li key={code}><strong>{code}</strong> {diagnoses.has(code) ? diagnoses.get(code) : null}</li>
                            )
                        : null
                    }
                </div>
            );
        case "OccupationalHealthcare":
            return (
                <div className="ui segment" >
                    <Header as="h3">{entry.date} <Icon name="user doctor" /></Header>
                    <p>{entry.description}</p>
                    {entry.diagnosisCodes && diagnoses
                        ? entry.diagnosisCodes.map(code =>
                            <li key={code}><strong>{code}</strong> {diagnoses.has(code) ? diagnoses.get(code) : null}</li>
                        )
                        : null
                    }
                </div>
            );
        case "HealthCheck":
            return (
                <div className="ui segment" >
                    <Header as="h3">{entry.date} <Icon name="user doctor" /></Header>
                    <p>{entry.description}</p>
                    <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
                </div>
            );
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;