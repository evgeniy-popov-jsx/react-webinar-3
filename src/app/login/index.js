import {memo, useState} from 'react';
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Auth from "../../containers/auth";
import AuthHeading from "../../components/auth-heading";
import AuthForm from "../../components/auth-form";

/**
 * Страница авторизации
 */
function Login() {

  const [stateInput, setStateInput] = useState({login: '', password: ''});
  const state = useSelector(state => state.user);
  const store = useStore();
  
  const {t} = useTranslate();

  const onAuth = (evt) => {
    evt.preventDefault();
    store.actions.user.userAuth(stateInput)
  }

  return (
    <PageLayout>
      <Auth />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <AuthHeading text={'Вход'}/>
      <AuthForm error={state.error} setStateInput={setStateInput} stateInput={stateInput} onSubmit={onAuth}/>
    </PageLayout>
  );
}

export default memo(Login);
