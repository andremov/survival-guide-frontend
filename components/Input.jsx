import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export function Input({ enableVisibilityToggle = false, type = 'text', placeholder, onChange, name, ...props}) {
  const [visible, setVisible] = React.useState(false)

  return (
    <div className={'input-component'}>
      {
        !!placeholder && <div className={'input-label'+(!!props.value? ' has-text' : '')}>
          {placeholder}
        </div>
      }
      <input
        {...props}
        type={visible? 'text' : type}
        onChange={e => onChange(name, e.target.value)}
      />
      {
        enableVisibilityToggle && <button className={'visibility-toggle'} onClick={() => setVisible(!visible)}>
          <FontAwesomeIcon icon={!visible? faEye : faEyeSlash}/>
        </button>
      }
    </div>
  );
}

export function DualInput({children}) {
  return (
    <div className={'dual-input-container'}>
      {children}
    </div>
  )
}
