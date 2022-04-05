import React, {useEffect, useState} from 'react';
import {Header} from "../../others/components/Header";
import {Content} from "../../others/components/Content";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useSosInfoContext} from "../../others/contexts/sosInfo";
import ToggleButton from "../../others/components/ToggleButton";
import {Text} from "../../others/components/Text";
import {Card} from "../../others/components/Card";
import styles from "./emergency.module.css";
import {Button} from "../../others/components/Button";
import {ImgPencil} from "../../medias/images/UGT_Asset_UI_Pencil";
import {ImgSOS} from "../../medias/images/UGT_Asset_UI_SOS";
import FormErrorText from "../../others/components/FormErrorText";

interface EmergencyOptionsI {
    selectedItem: string;
    onClick: (e: string) => void;
}

const EmergencyOptions = ({selectedItem, onClick}: EmergencyOptionsI) => {
    const emergency_codes = ["1", "2", "3"];
    const { t } = useTranslation();

    return <div>
        {emergency_codes.map(e => <ToggleButton key={e}
                                                active={e === selectedItem}
                                                value={t(`emergency_option_${e}`)}
                                                onClick={() => onClick(e)} />)}
    </div>
}

const Emergency = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { currentValue, updateValue } = useSosInfoContext();
    const [errorMessage, setErrorMessage] = useState<string>();

    const setEmergencyCode = (newValue: string) => updateValue({emergencyCode: newValue});
    const setGeoLocation = (newLatitude: number, newLongitude: number, newAccuracy: number) => updateValue({geolocation: {latitude: newLatitude, longitude: newLongitude, accuracy: newAccuracy}});

    const onEditUserInfo = () => {
        navigate("/landing");
    }

    useEffect(() => {
        if(!currentValue.phoneNumber || !currentValue.name) navigate("/landing");
    }, []);

    const onSendAlert = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setGeoLocation(position.coords.latitude, position.coords.longitude, position.coords.accuracy);
                navigate('/alerted');
            }, (error) => setErrorMessage(t('emergency_error_geolocation')));
        }
    }

    return (
        <React.Fragment>
            <Header hasHeadline hasLangSelector />
            <Content>
                <Card className={styles.infoContainer}>
                    <Card className={styles.infoCard}>
                        <Text>{t('emergency_user_info')}</Text>
                        <Text className={styles.name}>{currentValue.name}</Text>
                        <Text className={styles.textSecondary}>{currentValue.phoneNumber}</Text>
                    </Card>

                    <Card className={styles.infoEditCard}>
                        <div className={styles.infoEditIcon} onClick={onEditUserInfo}>
                            <ImgPencil />
                        </div>
                    </Card>
                </Card>

                <Card className={styles.childContainer}>
                    <Text required>{t('emergency_emergency_label')}</Text>
                    <EmergencyOptions selectedItem={currentValue.emergencyCode} onClick={setEmergencyCode} />
                </Card>

                <Card className={styles.childContainer}>
                    {errorMessage && <FormErrorText>{errorMessage}</FormErrorText>}
                    <Button className={styles.sosBtn} onClick={onSendAlert} fullWidth>
                        <div>
                            <ImgSOS fill="#FFF" />
                            <Text>{t('emergency_submit_alert')}</Text>
                        </div>
                    </Button>
                </Card>
            </Content>
        </React.Fragment>
    );
}

export default Emergency;