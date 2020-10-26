import {getConfig} from 'mattermost-redux/selectors/entities/general';

import {id as pluginId} from './manifest';

import UserAttribute from './components/user_attribute';
import CustomAttributesSettings from './components/admin_settings/custom_attribute_settings.jsx';
import Reducer from './reducers';
import Client from './client';

export default class Plugin {
    initialize(registry, store) {
        registry.registerReducer(Reducer);
        registry.registerPopoverUserAttributesComponent(UserAttribute);

        registry.registerAdminConsoleCustomSetting('CustomAttributes', CustomAttributesSettings);
        Client.setServerRoute(getServerRoute(store.getState()));
    }
}

window.registerPlugin(pluginId, new Plugin());

const getServerRoute = (state) => {
    const config = getConfig(state);

    let basePath = '';
    if (config && config.SiteURL) {
        basePath = new URL(config.SiteURL).pathname;

        if (basePath && basePath[basePath.length - 1] === '/') {
            basePath = basePath.substr(0, basePath.length - 1);
        }
    }

    return basePath;
};
