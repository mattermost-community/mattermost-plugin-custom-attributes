// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';

import AddAttribute from './add_attribute.jsx';
import CustomAttribute from './custom_attribute';

export default class CustomAttributesSettings extends React.Component {
        static propTypes = {
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            helpText: PropTypes.node,
            value: PropTypes.any,
            disabled: PropTypes.bool.isRequired,
            config: PropTypes.object.isRequired,
            currentState: PropTypes.object.isRequired,
            license: PropTypes.object.isRequired,
            setByEnv: PropTypes.bool.isRequired,
            onChange: PropTypes.func.isRequired,
            registerSaveAction: PropTypes.func.isRequired,
            setSaveNeeded: PropTypes.func.isRequired,
            unRegisterSaveAction: PropTypes.func.isRequired,
        }

        constructor(props) {
            super(props);

            this.state = {
                attributes: this.initAttributes(props.value),
            };
        }

        initAttributes(attributes) {
            if (!attributes) {
                return new Map();
            }

            // Store the attributes in a map indexed by position
            const attributesMap = new Map(attributes.map((a, index) => [index, a]));
            return attributesMap;
        }

        getAttributesList() {
            if (this.state.attributes.size === 0) {
                return (
                    <div style={styles.alertDiv}>
                        <p style={styles.alertText}> {'You have no custom attributes yet.'}
                        </p>
                    </div>
                );
            }

            return Array.from(this.state.attributes, ([key, value]) => {
                return (
                    <CustomAttribute
                        key={key}
                        id={key}
                        name={value.Name}
                        users={value.UserIDs}
                        groups={value.GroupIDs ? value.GroupIDs.join(' ') : ''}
                        markdownPreview={true}
                        onChange={this.handleChange}
                        onDelete={this.handleDelete}
                    />
                );
            });
        }

    handleDelete = (id) => {
        this.state.attributes.delete(id);

        this.props.onChange(this.props.id, Array.from(this.state.attributes.values()));
        this.props.setSaveNeeded();
    }

    handleChange = ({id, name, users, groups}) => {
        let userIds = [];
        if (users) {
            userIds = users.map((v) => {
                if (v.id) {
                    return v.id;
                }

                return v;
            });
        }
        this.state.attributes.set(id, {
            Name: name,
            UserIDs: userIds,
            GroupIDs: groups ? groups.split(' ') : '',
        });

        this.props.onChange(this.props.id, Array.from(this.state.attributes.values()));
        this.props.setSaveNeeded();
    };

    render() {
        return (
            <div>
                <p>{'Custom Attributes'}</p>
                <div>
                    {this.getAttributesList()}
                    <AddAttribute
                        onChange={this.handleChange}
                        id={this.state.attributes.size}
                    />
                </div>
            </div>
        );
    }
}

const styles = {
    alertDiv: {
        borderRadius: '4px',
        backgroundColor: 'rgba(0, 0, 0, .04)',
        color: '#000000',
        fontSize: '14px',
        fontFamily: 'Open Sans',
        height: '44px',
    },
    alertText: {
        opacity: '0.6',
        color: '#000000',
        fontFamily: 'Open Sans',
        fontSize: '14px',
        lineHeight: '1.5',
        padding: '10px',
    },
};
