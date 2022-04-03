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

    const onSubmit = () => {
        console.log('Alerted:', currentValue);
        navigate('/alerted');
    }

    const isFormValid = currentValue.phoneNumber && currentValue.phoneNumber.trim().length > 3;

    const setPhoneNumber = (newValue: string) => updateValue({phoneNumber: newValue});
    const setEmergencyCode = (newValue: string) => updateValue({emergencyCode: newValue});
    const setName = (newValue: string) => updateValue({name: newValue});
    const setLocation = (newValue: string) => updateValue({location: newValue});

    return (
        <React.Fragment>
            <Header hasHeadline hasLangSelector />
            <Content>
                <h1>{t('landing_title')}</h1>
                <Spacer size={50} />

                <Text>{t('phone_number')} <span className={styles.requiredField}>*</span></Text>
                <Spacer size={10} />
                <PhoneInput country={'ua'} value={currentValue.phoneNumber} placeholder={t('phone_number')} onChange={setPhoneNumber} />
                <Spacer size={30} />

                <Text>{t('landing_emergency_label')}</Text>
                <Spacer size={10} />
                <EmergenciesOptions selectedItem={currentValue.emergencyCode} onClick={setEmergencyCode} />
                <Spacer size={35} />

                <Text>{t('landing_name')}</Text>
                <Spacer size={10} />
                <Input value={currentValue.name || ''} label={t('landing_name')} placeholder={t('landing_name_placeholder')} onChange={setName} />
                <Spacer size={35} />

                <Text>{t('landing_location')}</Text>
                <Spacer size={10} />
                <Input value={currentValue.location || ''} label={t('landing_location')} placeholder={t('landing_location_placeholder')} onChange={setLocation} />
                <Spacer size={20} />

                <Button className={styles.submitButton} fullWidth onClick={onSubmit} disabled={!isFormValid}>
                    <div>
                        <ImgLocationPin fill='var(--color-white)' />
                        <Text>{t('landing_submit_btn')}</Text>
                    </div>
                </Button>
            </Content>
        </React.Fragment>
    );
};

export default Landing;