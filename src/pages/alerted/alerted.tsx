import React, {useEffect, useState} from 'react';
import {Header} from "../../others/components/Header";
import {Content} from "../../others/components/Content";
import {Spacer} from "../../others/components/Spacer";
import {Text} from "../../others/components/Text";
import {Button} from "../../others/components/Button";
import {useTranslation} from "react-i18next";
import styles from "./alerted.module.css";
import {useNavigate} from "react-router-dom";
import {Card} from "../../others/components/Card";
import mapImage from "../../medias/images/MapImage.png";
import {useSosInfoContext} from "../../others/contexts/sosInfo";

const Alerted = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [location, setLocation] = useState<string | undefined>('');
    const [counter, setCounter] = useState(5);
    const [canceled, setCanceled] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const { currentValue, clearStore } = useSosInfoContext();

    const onSubmit = () => {
        console.log('Request submitted', currentValue);
        setSubmitted(true);
        clearStore();
    }

    const onCancel = () => {
        console.log('Request canceled', currentValue);
        setCanceled(true);
        clearStore();
    }

    // Second Attempts
    useEffect(() => {
        if(canceled) return;
        if(counter === 0) onSubmit();

        const timer = setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    useEffect(() => {
        if(!currentValue || !currentValue.phoneNumber) navigate("/");
        setLocation(currentValue.location);
    }, []);

    return (
        <React.Fragment>
            <Header hasHeadline hasLangSelector />
            <Content>
                <Card className={styles.locationCard}>
                    <img src={mapImage} className={styles.mapImage} />
                    <Spacer size={5} />
                    <Text>{location}</Text>
                </Card>

                <Spacer size={20} />

                <h1>{t('alerted_title')}</h1>

                <Spacer size={10} />
                <Text className={styles.text}>{t('alerted_subtitle')}</Text>
                <Spacer size={20} />


                <div style={{display: "flex", justifyContent: "center"}}>
                    {!submitted && !canceled &&
                    <Button className={styles.submitButton} fullWidth onClick={onCancel} >
                        <Text>{t('alerted_btn')} ({counter})</Text>
                    </Button>}

                    {canceled && <Text className={styles.text}>{t('alerted_canceled')}</Text>}
                    {submitted && <Text className={styles.text}>{t('alerted_confirmed')}</Text>}
                </div>
            </Content>
        </React.Fragment>
    );
};

export default Alerted;