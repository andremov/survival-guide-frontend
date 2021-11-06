import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


export function DualInput({children}) {
  return (
    <div className={'dual-input-container'}>
      {children}
    </div>
  )
}
