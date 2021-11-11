import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Select } from './Select';

export default function Input({ enableVisibilityToggle = false, type = 'text', placeholder, onChange, name, ...props}) {
  const [visible, setVisible] = React.useState(false)

  if (type === 'select') {
    return <Select
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      {...props}
    />
  }

  if (type === 'smart') {
    return <SuggestiveInput
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      {...props}
    />
  }

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
export function SuggestiveInput({ placeholder, onChange, name, options=[], ...props}) {
  const [showOptions, setShowOptions] = React.useState(false)

  const handleOption = (item) => {
    onChange(name, item.val)
    setShowOptions(false)
  }

  const handleChange = e => {
    onChange(name, e.target.value)
    setShowOptions(true)
  }

  return (
    <div className={'input-component'}>
      {
        !!placeholder && <div className={'input-label'+(!!props.value? ' has-text' : '')}>
          {placeholder}
        </div>
      }
      <input
        onClick={() => setShowOptions(!showOptions)}
        onChange={handleChange}
        value={props.value}
      />
      { options.filter( item => item.label.includes( props.value ) ).length > 0 &&
        <div className={ `dropdown ${ showOptions ? 'visible' : '' }` }
             { ...props }
             onChange={ e => onChange( name, e.target.value ) }
        >
          { options.filter( item => item.label.includes( props.value ) )
            .map(
              ( item, i ) => <div
                className={ 'dropdown-option' }
                key={ i }
                onClick={ () => handleOption( item ) }
              >
                { item.label }
              </div>
            ) }
        </div>
      }
    </div>
  );
}


