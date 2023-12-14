import { memo, useCallback } from "react";
import SideLayout from "../../components/side-layout";
import AuthButton from "../../components/auth-button";
import AuthLink from "../../components/auth-link";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";

function Auth () {
    const store = useStore();
    const state = useSelector(state => state.user)
    const navigate = useNavigate();

    useInit(() => {
      store.actions.user.checkAuth();
    }, [], true);

    const callbacks = {
      onLogOut: useCallback(() => {
        store.actions.user.outAuth();
        navigate('/login');
      }, [store])
    }

    return (
        <SideLayout side='end'>
            <AuthLink auth={state.auth} name={state.user.name}/>
            <AuthButton auth={state.auth} onLogOut={callbacks.onLogOut}/>
        </SideLayout>
    )
}

export default memo(Auth);
