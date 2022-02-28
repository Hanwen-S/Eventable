import { AccountProfile } from "./account_profile";
import { AccountProfileDetails} from "./account_profile_detail";
import * as React from 'react';

export const Account = (porps) => {
    return(
        <div>
            <AccountProfile/>
            <AccountProfileDetails/>
        </div>
    );
}