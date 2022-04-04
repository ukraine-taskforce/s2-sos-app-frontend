import React, {useState} from 'react';
import {Header} from "../../others/components/Header";
import {Content} from "../../others/components/Content";
import {Spacer} from "../../others/components/Spacer";
import {Text} from "../../others/components/Text";
import {Button} from "../../others/components/Button";
import {useTranslation} from "react-i18next";
import {Input} from "../../others/components/Input";
import PhoneInput from "../../others/components/PhoneInput";
import styles from "./landing.module.css";
import { ImgLocationPin } from '../../medias/images/UGT_Asset_UI_LocationPin';
import {useNavigate} from "react-router-dom";
import ToggleButton from "../../others/components/ToggleButton";
import {useSosInfoContext} from "../../others/contexts/sosInfo";
import {validatePhoneNumber} from "../../others/helpers/validatePhoneNumber";
import FormErrorText from "../../others/components/FormErrorText";

interface EmergenciesOptions {
    selectedItem: string;
    onClick: (e: string) => void;
}

const EmergenciesOptions = ({selectedItem, onClick}: EmergenciesOptions) => {
    const emergency_codes = ["1", "2", "3"];
    const { t } = useTranslation();

    return <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap"}}>
        {emergency_codes.map(e => <ToggleButton key={e}
                                                active={e === selectedItem}
                                                value={t(`landing_emergency_${e}`)}
                                                onClick={() => onClick(e)} />)}
    </div>
}

const Landing = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { currentValue, updateValue } = useSosInfoContext();
    const [phoneNumberError, setPhoneNumberError] = useState<string | undefined>();
    const [errorMessage, setErrorMessage] = useState<string>();

    const onSubmit = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setGeoLocation(position.coords.latitude, position.coords.longitude, position.coords.accuracy);
                navigate('/alerted');
            }, (error) => setErrorMessage(t('landing_error_geolocation')));
        }
    }

    const isPhoneNumberValid = currentValue.phoneNumber && currentValue.phoneNumber.trim().length > 4 && !phoneNumberError;
    const isFormValid = isPhoneNumberValid;

    const setPhoneNumber = (newValue: string, countryCode: string) => {
        setPhoneNumberError(undefined);
        updateValue({phoneNumber: newValue});

        const validationResult = validatePhoneNumber(newValue, countryCode);
        if(validationResult.isInvalid) setPhoneNumberError(validationResult.error);
    }

    const setEmergencyCode = (newValue: string) => updateValue({emergencyCode: newValue});
    const setName = (newValue: string) => updateValue({name: newValue});
    const setAddress = (newValue: string) => updateValue({address: newValue});
    const setGeoLocation = (newLatitude: number, newLongitude: number, newAccuracy: number) => updateValue({geolocation: {latitude: newLatitude, longitude: newLongitude, accuracy: newAccuracy}});

    return (
        <React.Fragment>
            <Header hasHeadline hasLangSelector />
            <Content>
                <h1>{t('landing_title')}</h1>
                <Spacer size={50} />

                <Text>{t('phone_number')} <span className={styles.requiredField}>*</span></Text>
                <Spacer size={10} />
                <PhoneInput country={'ua'}
                            value={currentValue.phoneNumber}
                            placeholder={t('phone_number')}
                            isValid={!phoneNumberError}
                            onChange={(value: string, countryCode: string) => setPhoneNumber(value, countryCode)} />
                {phoneNumberError && <FormErrorText>{t(`landing_phoneNumber_${phoneNumberError}`)}</FormErrorText>}
                <Spacer size={30} />

                <Text>{t('landing_emergency_label')}</Text>
                <Spacer size={10} />
                <EmergenciesOptions selectedItem={currentValue.emergencyCode} onClick={setEmergencyCode} />
                <Spacer size={35} />

                <Text>{t('landing_name')}</Text>
                <Spacer size={10} />
                <Input value={currentValue.name || ''} label={t('landing_name')} placeholder={t('landing_name_placeholder')} onChange={setName} />
                <Spacer size={35} />

                <Text>{t('landing_address')}</Text>
                <Spacer size={10} />
                <Input value={currentValue.address || ''} label={t('landing_address')} placeholder={t('landing_address_placeholder')} onChange={setAddress} />
                <Spacer size={20} />

                <Button className={styles.submitButton} fullWidth onClick={onSubmit} disabled={!isFormValid}>
                    <div>
                        <ImgLocationPin fill='var(--color-white)' />
                        <Text>{t('landing_submit_btn')}</Text>
                    </div>
                </Button>

                {errorMessage && <FormErrorText>{errorMessage}</FormErrorText>}
            </Content>
        </React.Fragment>
    );
};

export default Landing;