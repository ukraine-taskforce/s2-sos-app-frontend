import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../others/components/Button';
import { Header } from '../../others/components/Header';
import { Spacer } from '../../others/components/Spacer';
import { Text } from '../../others/components/Text';
import { Content } from '../../others/components/Content';
import { Checkmark } from '../../others/components/Checkmark';
import { ImgNext } from '../../medias/images/UGT_Asset_UI_ButtonNext';
import Markdown from 'react-markdown';

import styles from './howto.module.css';

export function Howto() {
    const { t } = useTranslation();
    // const navigate = useNavigate();
    const [displayStep, setDisplayStep] = React.useState(0);
    return (
        <React.Fragment>
            <Header hasHeadline hasLangSelector />
            <Content>
                <div className={styles.imgPlaceholder}></div>

                {/* <Spacer size={50} /> */}

                <div>
                    {displayStep === 0 && (
                        <Text alignment='center' className={styles.textB}>
                            <Markdown>{t('howto_text_0')}</Markdown>
                        </Text>
                    )}
                    {displayStep === 1 && (
                        <Text alignment='center' className={styles.text}>
                            <Markdown>{t('howto_text_1_1')}</Markdown>
                            <Markdown>{t('howto_text_1_2')}</Markdown>
                        </Text>
                    )}
                    {displayStep === 2 && (
                        <Text alignment='center' className={styles.text}>
                            <Markdown>{t('howto_text_2')}</Markdown>
                        </Text>
                    )}
                </div>
                {/* <Spacer size={250} /> */}

                {displayStep === 0 && (
                    <Button
                        variant='highlight'
                        fullWidth
                        onClick={() => setDisplayStep(1)}
                        trailingIcon={<ImgNext alt='' />}
                    >
                        {t('start_set_up_button')}
                    </Button>
                )}

                {displayStep === 1 && (
                    <Button
                        variant='highlight'
                        fullWidth
                        onClick={() => setDisplayStep(2)}
                        trailingIcon={<ImgNext alt='' />}
                    >
                        {t('next')}
                    </Button>
                )}
                {displayStep === 2 && (
                    <div>
                        {/* <Checkmark /> */}
                        <Button
                            variant='highlight'
                            fullWidth
                            onClick={() => setDisplayStep(0)}
                        >
                            {t('start_button_text')}
                        </Button>
                    </div>
                )}
            </Content>
        </React.Fragment>
    );
}
