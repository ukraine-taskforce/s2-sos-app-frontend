import React, {useCallback, useEffect, useState} from 'react';
import ReactGA from "react-ga4";
import {Header} from "../../others/components/Header";
import {Content} from "../../others/components/Content";
import {Spacer} from "../../others/components/Spacer";
import {Text} from "../../others/components/Text";
import {useTranslation} from "react-i18next";
import styles from "./alerted.module.css";
import {Card} from "../../others/components/Card";
import {useSosInfoContext} from "../../others/contexts/sosInfo";
import {ImgLocationPin} from "../../medias/images/UGT_Asset_UI_LocationPin";
import {ImgAlertCircle} from "../../medias/images/UGT_Asset_UI_AlertCircle";
import {ImgAlertRedCircle} from "../../medias/images/UGT_Asset_UI_AlertRedCircle";
import {postToApi} from "../../others/api/api";

enum PageStatus { INITIAL, FAILED, CONFIRMED};

const Alerted = () => {
    const { t } = useTranslation();

    const [errorMessage, setErrorMessage] = useState<string>();
    const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.INITIAL);

    const { currentValue, updateValue } = useSosInfoContext();

    useEffect(() => {
      document.title = t("alerted_page_title");
      ReactGA.initialize(process.env.REACT_APP_GA4_ID as string);
      ReactGA.send("pageview");
    }, [t]);

    const parseBackMessage = useCallback( () => {
        const emergency = currentValue.emergencyCode === '3' ? `${t('emergency_option_1', {lng: 'en'})} and ${t('emergency_option_2', {lng: 'en'})}` : t('emergency_option_' + currentValue.emergencyCode, {lng: 'en'});
        return `${t('name', {lng: 'en'})}: ${currentValue.name}%0A
${t('phone_number', {lng: 'en'})}: ${currentValue.phoneNumber}%0A
${t('emergency', {lng: 'en'})}: ${emergency}%0A
${t('address', {lng: 'en'})}: ${currentValue.address}%0A
${t('location', {lng: 'en'})}: ${currentValue.geolocation!.latitude}, ${currentValue.geolocation!.longitude}%0A
${t('location_accuracy', {lng: 'en'})}: ${Math.floor(currentValue.geolocation!.accuracy)} m%0A
${t('comment', {lng: 'en'})}: ${currentValue.addressComment}`
    }, [currentValue.address, currentValue.addressComment, currentValue.emergencyCode, currentValue.geolocation, currentValue.name, currentValue.phoneNumber, t]);

    const onSubmit = useCallback(async() => {
      try {
        if (currentValue.requestPending) {
          await postToApi(parseBackMessage());
          ReactGA.event({category: 'apiCall', action: 'succeeded'});
          updateValue({requestPending: false});
        }
        setPageStatus(PageStatus.CONFIRMED);
      } catch(error) {
        setErrorMessage(t('alerted_errorMessage'));
        ReactGA.event({category: 'apiCall', action: 'failed'});
        setPageStatus(PageStatus.FAILED);
      }
    }, [currentValue, t, updateValue, parseBackMessage]);

    useEffect(() => {
      onSubmit();
    }, [onSubmit]);

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
                    </Card>

                    <Spacer size={20} />
                    <div style={{display: "flex", justifyContent: "center"}}>
                        {pageStatus === PageStatus.FAILED && <div className={styles.footerCenterMessage}>
                            {errorMessage && <><Text className={styles.errorText}>{errorMessage}</Text><Spacer size={5} /></>}
                        </div>}
                    </div>
                </>
                }
            </Content>
        </React.Fragment>
    );
};

export default Alerted;
