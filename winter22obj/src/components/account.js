import { AccountProfile } from "./account_profile";
import { AccountProfileDetails} from "./account_profile_detail";
import { useLocation } from 'react-router';
import * as React from 'react';

export const Account = (props) => {
    const {state}=useLocation();
    console.log(state);
    return(
        <div>
            <AccountProfile props={state}/>
            <AccountProfileDetails props={state}/>
        </div>
    );
}