import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';
import ReactGA from "react-ga4";

import { Button } from '../../others/components/Button';
import { Header } from '../../others/components/Header';
import { Text } from '../../others/components/Text';
import { Content } from '../../others/components/Content';
import Checkbox from '../../others/components/Checkbox';
import { ImgTutorialStart } from '../../medias/images/UGT_Asset_tutorial_0';
import { ImgTutorialFirst } from '../../medias/images/UGT_Asset_tutorial_1';
import { ImgTutorialSecond } from '../../medias/images/UGT_Asset_tutorial_2';

import { ImgNext } from '../../medias/images/UGT_Asset_UI_ButtonNext';

import styles from './howto.module.css';
import {useSosInfoContext} from "../../others/contexts/sosInfo";
import {ImgInfo} from "../../medias/images/UGT_Asset_UI_Info";
import {Spacer} from "../../others/components/Spacer";
import {ImgBrand} from "../../medias/images/UGT_Asset_Brand";
import {ImgShare} from "../../medias/images/UGT_Asset_UI_Share";
import {Modal} from "../../others/components/Modal";
import {isShareSupported, useShare} from "../../others/helpers/share";

export function Howto() {
    const { t } = useTranslation();
    const { share } = useShare();
    const navigate = useNavigate();
    const [displayStep, setDisplayStep] = React.useState(0);
    const [displayModal, setDisplayModal] = React.useState(false);
    const { currentValue, updateValue } = useSosInfoContext();

    const handleChange = () => {
        displayStep === 2 ? setDisplayStep(3) : setDisplayStep(2);
        updateValue({ termsAccepted: !currentValue.termsAccepted });
    };

    useEffect(() => {
        if(currentValue.termsAccepted) navigate('/emergency');
    }, []); // eslint-disable-line

    useEffect(() => {
      document.title = t("howto_page_title") + (displayStep + 1);
      ReactGA.initialize(process.env.REACT_APP_GA4_ID as string);
      ReactGA.send("pageview");
    }, [displayStep, t]);

    return (
        <React.Fragment>
            <Header hasHeadline hasLangSelector />
            <Content>
                {displayStep === 0 && (
                    <>
                        <div className={styles.tutorialImg}>
                            <ImgTutorialStart alt='start' />
                        </div>
                        <Text alignment='center' className={styles.textB}>
                            <Markdown>{t('howto_text_0')}</Markdown>
                        </Text>

                        <div className={styles.aboutContainer}>
                            <Button
                                leadingIcon={<ImgInfo alt="" />}
                                variant="white"
                                centered={false}
                                onClick={() => setDisplayModal(true)}
                            >
                                <span className={styles.noWrap}>{t('about')}</span>
                            </Button>
                        </div>

                        <Button
                            variant='highlight'
                            fullWidth
                            onClick={() => setDisplayStep(1)}
                            trailingIcon={<ImgNext alt='' />}
                            className={styles.button0}
                        >
                            {t('start_set_up_button')}
                        </Button>
                    </>
                )}
                {displayStep === 1 && (
                    <>
                        <div className={styles.tutorialImg}>
                            <ImgTutorialFirst alt='submit' />
                        </div>
                        <Text alignment='center' className={styles.text}>
                            <Markdown>{t('howto_text_1_1')}</Markdown>
                        </Text>

                        <div>
                            <Button
                                variant='highlight'
                                fullWidth
                                onClick={() => setDisplayStep(2)}
                                trailingIcon={<ImgNext alt='' />}
                            >
                                {t('next')}
                            </Button>
                            <Button
                                variant='white'
                                fullWidth
                                onClick={() => setDisplayStep(0)}
                            >
                                {t('back')}
                            </Button>
                        </div>
                    </>
                )}
                {displayStep > 1 && (
                    <>
                        <div className={styles.tutorialImg}>
                            <ImgTutorialSecond alt='alarm' />
                        </div>
                        <Text alignment='center' className={styles.text}>
                            <Markdown>{t('howto_text_2')}</Markdown>
                        </Text>
                        <div>
                            <div className={styles.checkBoxContainer}>
                                <Checkbox
                                    id='checkbox'
                                    value={currentValue.termsAccepted}
                                    handleChange={handleChange}
                                />
                                <Text className={styles.checkBoxText}>
                                    {t('checkbox_text')}
                                </Text>
                            </div>

                            {displayStep === 2 && (
                                <Button variant='highlight' fullWidth disabled>
                                    {t('start_button_text')}
                                </Button>
                            )}

                            {displayStep === 3 && (
                                <Button
                                    variant='highlight'
                                    fullWidth
                                    onClick={() => navigate(`/landing`)}
                                >
                                    {t('start_button_text')}
                                </Button>
                            )}

                            <Button
                                variant='white'
                                fullWidth
                                onClick={() => setDisplayStep(1)}
                            >
                                {t('back')}
                            </Button>
                        </div>
                    </>
                )}

                {/* About modal */}
                <Modal show={displayModal} handleClose={() => setDisplayModal(false)}>
                    <Spacer size={50} />
                    <div style={{ display: "flex" }}>
                        <Spacer flex={1} />
                        <ImgBrand className={styles.ugtLogo} alt="UGT Logo" />
                        <Spacer flex={1} />
                    </div>
                    <Spacer size={20} />
                    <h1 style={{ textAlign: "center" }}>{t("about_dialog_head")}</h1>
                    <Spacer size={22} />
                    <div style={{textAlign: "center"}}><Text>{t("about_dialog_detailed")}</Text></div>
                    <Spacer size={22} />
                    {isShareSupported() && (
                        <Button
                            fullWidth
                            centered
                            variant="highlight"
                            onClick={() => {
                                share();
                            }}
                            trailingIcon={
                                <ImgShare style={{ height: "15px" }} fill="var(--color-white)" alt={t("share")} />
                            }
                        >
                            {t("share")}
                        </Button>
                    )}

                    <Button
                        fullWidth
                        centered
                        variant="white"
                        onClick={(e) => {
                            const w = window.open('','_blank');
                            if(!w) return;
                            w.location.href = "mailto:ugt@ukraineglobaltaskforce.com";
                            w.focus();
                            e.preventDefault();
                        }}
                    >
                        <span className={styles.noWrap}>{t('contact_us')}</span>
                    </Button>
                </Modal>
            </Content>
        </React.Fragment>
    );
}
