# Mattermost Custom Attributes Plugin [![CircleCI](https://circleci.com/gh/mattermost/mattermost-plugin-custom-attributes.svg?style=svg)](https://circleci.com/gh/mattermost/mattermost-plugin-custom-attributes)

This plugin allows you to add custom attributes to users in your Mattermost. Currently it only exposes those attributes in the profile popover of users but in the future the plan is to extend the plugin to allow adding badges next to usernames based on attributes and potentially display the attributes in other places.

We use this plugin on https://community.mattermost.com to distinguish Mattermost core committers and staff from other users.

**Supported Mattermost Server Versions: 5.4+**

## Installation

1. Go to the [releases page of this GitHub repository](https://github.com/mattermost/mattermost-plugin-custom-attributes/releases) and download the latest release.
2. Upload this file in the Mattermost **System Console > Plugins > Management** page to install the plugin. To learn more about how to upload a plugin, [see the documentation](https://docs.mattermost.com/administration/plugins.html#plugin-uploads).
3. Modify your `config.json` file to include your custom attributes, under the `PluginSettings`. See below for an example of what this should look like.

## Usage

To add a custom attribute you need to edit your `config.json` and add a "CustomAttributes" field containing an array of the attributes you want to add. An attribute should have a "Name" field for what is displayed in the UI as the attribute and an array of "UserIDs" for the users this attribute should apply to. The "Name" field can include Mattermost friendly Markdown, emojis and/or links.

Below is an example:


```
"PluginSettings": {
    ...
    "Plugins": {
        "com.mattermost.custom-attributes": {
            "CustomAttributes": [
                {
                    "Name": ":mattermost: [Core Committer](https://developers.mattermost.com/contribute/getting-started/core-committers/)",
                    "UserIDs": ["someuserID1", "someuserID2"]
                },
                {
                    "Name": ":mattermost: Staff",
                    "UserIDs": ["someuserID3", "someuserID4"]
                }
            ]
        }
    }
    ...
    "PluginStates": {
        ...
        "com.mattermost.custom-attributes": {
            "Enable": true
        },
        ...
    }
},
```