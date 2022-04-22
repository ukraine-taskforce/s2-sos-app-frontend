import React, {useEffect, useRef, useState} from 'react';
import ReactGA from "react-ga4";
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
import {getStreetAddressFromGeolocation} from "../../others/helpers/googleMapsApi";
import {Input} from "../../others/components/Input";
import { Spacer } from "../../others/components/Spacer";
import { Map } from "../../others/components/Map";

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
    const navigate = useRef(useNavigate());
    const [displayStep, setDisplayStep] = React.useState(0);

    const { currentValue, updateValue } = useSosInfoContext();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    const setEmergencyCode = (newValue: string) => updateValue({emergencyCode: newValue});
    const setAddress = (newValue: string) => updateValue({address: newValue});

    useEffect(() => {
      document.title = t("emergency_page_title");
      ReactGA.initialize(process.env.REACT_APP_GA4_ID as string);
      ReactGA.send("pageview");
    }, [t]);

    const onEditUserInfo = () => {
        navigate.current("/landing");
    }

    useEffect(() => {
        if(!currentValue.phoneNumber || !currentValue.name) navigate.current("/landing");
    }, [navigate, currentValue.phoneNumber, currentValue.name]);

    const onError = () => {
        setErrorMessage(t('emergency_error_geolocation'));
        setLoading(false);
    }

    const handlePosition = (position: GeolocationPosition) => {
        if(currentValue.geolocation) {
            const newValue = {
                requestPending: true,
                geolocation: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                }
            };
            ReactGA.event({category: 'location', action: 'gpsAccuracyMeters', value: position.coords.accuracy});
            getStreetAddressFromGeolocation(position.coords.latitude, position.coords.longitude)
                .then((address) => {
                    if(!address) {
                        ReactGA.event({category: 'error', action: 'getAddressError'});
                    }

                    updateValue({...newValue, address});
                    setDisplayStep(1);
                });
        }
    }

    const onSendAlert = () => {
      ReactGA.event({category: 'user', action: 'submitted'});
      navigate.current('/alerted');
    }
    const onDetectLocation = () => {
        setLoading(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                handlePosition,
                (error) => {
                    ReactGA.event({category: 'error', action: 'geoLocationError'});
                    onError();
                },
                {enableHighAccuracy: true});
        } else {
            ReactGA.event({category: 'error', action: 'geoLocationMissing'});
        }
    }

    return (
        <React.Fragment>
            <Header hasHeadline hasLangSelector />
            <Content>
                {displayStep === 1 && <>
                   <Text className={styles.title}>{t('confirm_location_title')}</Text>
                   <Spacer size={20} />
                   <Text>{t('your_detected_location')}: {currentValue.geolocation?.latitude}, {currentValue.geolocation?.longitude} accuracy {Math.floor(currentValue.geolocation!.accuracy)}{t('m')}</Text>
                   <Map />
                   <Spacer size={30} />
                   <Text>{t('your_address')}</Text>
                   <Spacer size={10} />
                   <Input value={currentValue.address ? currentValue.address : ""} onChange={setAddress} label={t('your_address')} placeholder={t('your_address_placeholder')} />
                    <Card className={styles.childContainer}>
                      <Button className={styles.sosBtn} onClick={onSendAlert} fullWidth>
                        <div>
                          <ImgSOS fill="#FFF" />
                          <Text>{t('emergency_submit_alert')}</Text>
                        </div>
                      </Button>
                    </Card>
                 </>}
                {(displayStep === 0 && loading) && <Card className={styles.textCenter}>Loading</Card>}

                {(displayStep === 0 && !loading) && <>
                    <Card className={styles.infoContainer}>
                        <Card className={styles.infoCard}>
                            <Text>{t('emergency_user_info')}</Text>
                            <Text className={styles.name}>{currentValue.name}</Text>
                            <Text className={styles.textSecondary}>{currentValue.phoneNumber}</Text>

                            { currentValue.addressComment?.trim() &&
                            <Card className={styles.additionalInfoCard}>
                                <Text>{t('emergency_additional_info')}</Text>
                                <Text className={styles.textSecondary}>{currentValue.addressComment}</Text>
                            </Card>
                            }
                        </Card>

                        <Card className={styles.infoEditCard}>
                            <div className={styles.infoEditIcon} onClick={onEditUserInfo}>
                                <ImgPencil/>
                            </div>
                        </Card>
                    </Card>

                    <Card className={styles.childContainer}>
                        <Text required>{t('emergency_emergency_label')}</Text>
                        <EmergencyOptions selectedItem={currentValue.emergencyCode} onClick={setEmergencyCode} />
                    </Card>

                    <Card className={styles.childContainer}>
                {errorMessage && <FormErrorText>{errorMessage}</FormErrorText>}
                    <Button className={styles.sosBtn} onClick={onDetectLocation} fullWidth>
                    <div>
                    <ImgSOS fill="#FFF" />
                    <Text>{t('emergency_submit_alert')}</Text>
                    </div>
                    </Button>
                    </Card>
                </>}
            </Content>
        </React.Fragment>
    );
}

export default Emergency;
