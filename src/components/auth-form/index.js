import { memo } from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";

import './style.css';

function AuthForm({error, setStateInput, stateInput, onSubmit}) {

  const cn = bem('AuthForm');

  const onChangeInput = (evt) => {
    setStateInput(state => ({
      ...state,
      [evt.target.id]: evt.target.value
    }))
  }


  return (
    <form className={cn()} onSubmit={onSubmit}>
      <label className={cn('label')} htmlFor="login">
        Логин
        <input
          className={cn('input')}
          id='login' type="text"
          value={stateInput.login}
          onChange={onChangeInput} />
      </label>
      <label className={cn('label')} htmlFor="password">
        Пароль
        <input
          className={cn('input')}
          id='password' type="password"
          value={stateInput.password}
          onChange={onChangeInput} />
      </label>
        {error 
            ? <span>{error}</span> 
            : null
        }
      <button className={cn('button')}>Войти</button>
    </form>
  )
}

AuthForm.propTypes = {
  error: PropTypes.string,
  setStateInput: PropTypes.func,
  stateInput: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default memo(AuthForm);
