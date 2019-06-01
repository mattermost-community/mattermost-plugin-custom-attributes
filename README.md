# Mattermost Custom Attributes Plugin [![CircleCI](https://circleci.com/gh/mattermost/mattermost-plugin-custom-attributes.svg?style=svg)](https://circleci.com/gh/mattermost/mattermost-plugin-custom-attributes)

This plugin adds custom attributes to users in your Mattermost instance.

Currently the plugin only exposes the specified attributes in the user profile popover, but this plugin can be extended to allow displaying attributes elsewhere in the user interface, such as badges next to usernames.

We use this plugin on https://community.mattermost.com to distinguish Mattermost core committers and staff.

![image](https://user-images.githubusercontent.com/13119842/58710612-b5c7b380-838a-11e9-9974-4487daf82da5.png)

## Configuration

1. Go to **System Console > Plugins > Management** and click **Enable** to enable the Customer Attributes plugin.(https://docs.mattermost.com/administration/plugins.html#plugin-uploads).
    - If you are running Mattermost v5.11 or earlier, you must first go to the [releases page of this GitHub repository](https://github.com/mattermost/mattermost-plugin-custom-attributes/releases), download the latest release, and upload it to your Mattermost instance [following this documentation](https://docs.mattermost.com/administration/plugins.html#plugin-uploads).

2. Modify your `config.json` file to include your custom attributes, under the `PluginSettings`. See below for an example of what this should look like.

## Usage

To add a custom attribute, edit your `config.json` file and add a "CustomAttributes" field. This field contains an array of the attributes you want to add.

An attribute should have a `Name` field for what is displayed in the user interface as the attribute and an array of `UserIDs` for the users this attribute should apply to. The `Name` field can include Markdown, emojis and links.

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

## Development

This plugin contains both a server and webapp portion portion.

Use `make dist` to build distributions of the plugin that you can upload to a Mattermost server.
Use `make check-style` to check the style.
Use `make deploy` to deploy the plugin to your local server.

For additional information on developing plugins, refer to [our plugin developer documentation](https://developers.mattermost.com/extend/plugins/).

