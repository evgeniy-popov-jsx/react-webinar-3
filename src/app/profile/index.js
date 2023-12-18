import {memo} from 'react';
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Auth from "../../containers/auth";
import AuthHeading from '../../components/auth-heading';
import ProfileInfo from '../../components/profile-info';
import Spinner from '../../components/spinner';
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";

/**
 * Страница Профиля
 */
function Profile() { 
  const store = useStore();

  useInit(() => {
    store.actions.profile.load();
  }, [], true);

  const select = useSelector(state => ({
    name: state.user.user.name,
    phone: state.user.user.phone,
    email: state.user.user.email,
    waiting: state.user.waiting,
    auth: state.profile.auth,
  }));

  const {t} = useTranslate();

  return (
    <PageLayout>
      <Auth />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      {select.auth && (
        <>
          <AuthHeading text={'Профиль'}/>
          <Spinner active={select.waiting}>
            <ProfileInfo name={select.name} phone={select.phone} email={select.email}/>
          </Spinner>
        </>
      )}  
    </PageLayout>
  );
}

export default memo(Profile);
