import styles from './Checkbox.module.css';

import { useState } from 'react';

const Checkbox = ({ id, value, handleChange }) => {
    const [checked, setChecked] = useState(false);

    const onChange = () => {
        setChecked(!checked);
        handleChange();
    };
    return (
        <div>
            <input
                id={id}
                type='checkbox'
                checked={value}
                onChange={onChange}
            />
            <label htmlFor={id}>
                <svg
                    className={
                        checked ? styles.checkboxActive : styles.checkbox
                    }
                    aria-hidden='true'
                    viewBox='0 0 20 11'
                    fill='none'
                >
                    <path
                        d='M1 4.5L5 9L14 1'
                        strokeWidth='2'
                        stroke={checked ? '#fff' : 'none'}
                    />
                </svg>
            </label>
        </div>
    );
};

export default Checkbox;
