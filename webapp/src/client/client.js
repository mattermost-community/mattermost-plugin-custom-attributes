import {Client4} from 'mattermost-redux/client';
import {ClientError} from 'mattermost-redux/client/client4';

import {id as pluginId} from './manifest';

export default class Client {
    setServerRoute(url) {
        this.url = `${url}/plugins/${pluginId}`;
    }

    getAttributes = async (userID = '') => {
        return this.doGet(`${this.url}/api/v1/attributes?user_id=${userID}`);
    };

    doGet = async (url, body, headers = {}) => {
        const options = {
            method: 'get',
            headers,
        };

        const response = await fetch(url, Client4.getOptions(options));

        if (response.ok) {
            return response.json();
        }

        const text = await response.text();

        throw new ClientError(Client4.url, {
            message: text || '',
            status_code: response.status,
            url,
        });
    };
}
