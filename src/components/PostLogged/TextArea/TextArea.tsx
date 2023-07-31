
import React, { TextareaHTMLAttributes } from 'react';
import styles from './styles.module.css';


interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    msgError?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ msgError, ...rest }, ref) => (
    <textarea 
        className={styles.textarea}
        ref={ref}
        {...rest}
    ></textarea>
))
