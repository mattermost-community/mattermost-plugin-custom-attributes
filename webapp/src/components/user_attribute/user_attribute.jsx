import React from 'react';
import PropTypes from 'prop-types';

import {id as pluginId} from '../../manifest';

const {formatText, messageHtmlToComponent} = window.PostUtils;

export default class UserAttribute extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        attributes: PropTypes.arrayOf(PropTypes.string),
        actions: PropTypes.shape({
            getAttributes: PropTypes.func.isRequired,
        }).isRequired,
    };

    constructor(props) {
        super(props);

        if (props.attributes == null) {
            props.actions.getAttributes(props.id);
        }
    }

    render() {
        const {attributes} = this.props;

        if (attributes == null || attributes.length === 0) {
            return null;
        }

        return (
            <div>
                {attributes.map((attribute) => {
                    const formattedText = formatText(attribute);
                    return (
                        <div
                            key={pluginId + '__' + attribute}
                            style={style.row}
                        >
                            {messageHtmlToComponent(formattedText)}
                        </div>
                    );
                })}
            </div>
        );
    }
}

const style = {
    row: {
        minHeight: '23px',
    },
};
