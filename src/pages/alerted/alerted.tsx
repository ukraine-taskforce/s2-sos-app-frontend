import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactGA from "react-ga4";
import {Header} from "../../others/components/Header";
import {Content} from "../../others/components/Content";
import {Spacer} from "../../others/components/Spacer";
import {Text} from "../../others/components/Text";
import {Button} from "../../others/components/Button";
import {useTranslation} from "react-i18next";
import styles from "./alerted.module.css";
import {useNavigate} from "react-router-dom";
import {Card} from "../../others/components/Card";
import {useSosInfoContext} from "../../others/contexts/sosInfo";
import {ImgLocationPin} from "../../medias/images/UGT_Asset_UI_LocationPin";
import {ImgAlertCircle} from "../../medias/images/UGT_Asset_UI_AlertCircle";
import {ImgAlertRedCircle} from "../../medias/images/UGT_Asset_UI_AlertRedCircle";
import {postToApi} from "../../others/api/api";

enum PageStatus { COUNT_DOWN, CANCELED, CONFIRMED};

const Alerted = () => {
    const { t } = useTranslation();
    const navigate = useRef(useNavigate());

    const [counter, setCounter] = useState(5);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.COUNT_DOWN);

    const { currentValue, updateValue } = useSosInfoContext();

    useEffect(() => {
      document.title = t("alerted_page_title");
      ReactGA.initialize(process.env.REACT_APP_GA4_ID as string);
      ReactGA.send("pageview");
    }, [t]);

    const parseBackMessage = useCallback( () => {
        const emergency = currentValue.emergencyCode === '3' ? `${t('emergency_option_1', {lng: 'en'})} and ${t('emergency_option_2', {lng: 'en'})}` : t('emergency_option_' + currentValue.emergencyCode, {lng: 'en'});
        return `${t('name', {lng: 'en'})}: ${currentValue.name}
                ${t('phone_number', {lng: 'en'})}: ${currentValue.phoneNumber}
                ${t('emergency', {lng: 'en'})}: ${emergency}
                ${t('address', {lng: 'en'})}: ${currentValue.address}
                ${t('location', {lng: 'en'})}: ${currentValue.geolocation!.latitude}, ${currentValue.geolocation!.longitude}
                ${t('location_accuracy', {lng: 'en'})}: ${Math.floor(currentValue.geolocation!.accuracy)} m
                ${t('comment', {lng: 'en'})}: ${currentValue.addressComment}
                `
    }, [currentValue.address, currentValue.addressComment, currentValue.emergencyCode, currentValue.name, currentValue.phoneNumber, t]);

    const onSubmit = async () => {
        try {
            await postToApi({
                Message: parseBackMessage(),
                PhoneNumber: currentValue.phoneNumber
            });

            setPageStatus(PageStatus.CONFIRMED);
        } catch(error) {
            setErrorMessage(t('alerted_errorMessage'));
            onCancel();
        }

        updateValue({requestPending: false});
    };

    const onCancel = () => {
        setPageStatus(PageStatus.CANCELED);
        updateValue({requestPending: false});

        setTimeout(() => {
            navigate.current("/emergency");
        }, 5000);
    }

    useEffect(() => {
        if(pageStatus === PageStatus.CANCELED) return;
        if(counter === 0) onSubmit();

        const timer = setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]); // eslint-disable-line

    useEffect(() => {
        if(!currentValue.requestPending) navigate.current("/emergency");
    }, []); // eslint-disable-line

    return (
        <React.Fragment>
            <Header hasHeadline hasLangSelector />
            <Content>
                {pageStatus === PageStatus.CONFIRMED ?
                    <>
                        <Card>
                            <Card className={styles.locationCard}>
                                <Card>
                                    <ImgLocationPin fill="#000" />
                                </Card>
                                <Text alignment="center">{currentValue.address}</Text>
                            </Card>

                            <Spacer size={20} />

                            <Card className={styles.centerH}>
                                <ImgAlertRedCircle />
                            </Card>

                            <Card>
                                <h1>{t('alerted_title_success')}</h1>
                            </Card>

                            <Card className={styles.textCenter}>
                                <Text className={styles.text}>{t('alerted_subtitle_success')}</Text>
                            </Card>

                            <Spacer size={20} />

                            <Card className={styles.textCenter}>
                                <Text className={styles.text}>{t('alerted_confirmed')}</Text>
                            </Card>
                        </Card>
                    </>
                :<>
                    <Card>
                        <Card className={styles.locationCard}>
                            <Card>
                                <ImgLocationPin fill="#000" />
                            </Card>
                            <Text alignment="center">{currentValue.address}</Text>
                        </Card>

                        <Spacer size={20} />

                        <Card className={styles.centerH}>
                            <ImgAlertCircle fill="#FFF" />
                        </Card>

                        <Card>
                            <h1>{t('alerted_title')}</h1>
                        </Card>

                        <Card className={styles.textCenter}>
                            <Text className={styles.text}>{t('alerted_subtitle')}</Text>
                        </Card>
                    </Card>

                    <Spacer size={20} />
                    <div style={{display: "flex", justifyContent: "center"}}>
                        {pageStatus === PageStatus.COUNT_DOWN &&
                        <Button className={styles.submitButton} fullWidth onClick={onCancel} >
                            <Text>{t('alerted_btn')} ({counter})</Text>
                        </Button>}

                        {pageStatus === PageStatus.CANCELED && <div className={styles.footerCenterMessage}>
                            {errorMessage && <><Text className={styles.errorText}>{errorMessage}</Text><Spacer size={5} /></>}
                            <Text className={styles.text}>{t('alerted_canceled')}</Text>
                        </div>}
                    </div>
                </>
                }
            </Content>
        </React.Fragment>
    );
};

export default Alerted;
