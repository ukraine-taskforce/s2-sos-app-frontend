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

export function Howto() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [displayStep, setDisplayStep] = React.useState(0);
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
            </Content>
        </React.Fragment>
    );
}
