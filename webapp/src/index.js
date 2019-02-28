import {id as pluginId} from './manifest';

import UserAttribute from './components/user_attribute';
import Reducer from './reducers';

export default class Plugin {
    initialize(registry) {
        registry.registerReducer(Reducer);
        registry.registerPopoverUserAttributesComponent(UserAttribute);
    }
}

window.registerPlugin(pluginId, new Plugin());
