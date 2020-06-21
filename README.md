# Mattermost Custom Attributes Plugin 

[![CircleCI](https://circleci.com/gh/mattermost/mattermost-plugin-custom-attributes.svg?style=svg)](https://circleci.com/gh/mattermost/mattermost-plugin-custom-attributes)

**Maintainer:** [@marianunez](https://github.com/marianunez)
**Co-Maintainer:** [@larkox](https://github.com/larkox)

This plugin adds custom attributes to users in your Mattermost instance.  You can specify an Attribute, and then specify specific users, teams or groups which will display that attribute on their public profile - so other users can identify them easily.  This can be useful when there are Team Leads, Timezones, etc. and makes it easy to show who is on a particular team or Project.  

Currently the plugin only exposes the specified attributes in the user profile popover, but this plugin could be extended to allow displaying attributes elsewhere in the user interface, such as badges next to usernames. 

We use this plugin on https://community.mattermost.com to distinguish Mattermost core committers and staff.

![image](https://user-images.githubusercontent.com/13119842/58710612-b5c7b380-838a-11e9-9974-4487daf82da5.png)


# Version 1.20 (Latest)

## Requirements
- Mattermost Sever 5.20+
- To use the "Group" features in this plugin requires a [Mattermost E20 Licence](https://mattermost.com/pricing/) to enable the AD/LDAP Groups Feature

## Installation

Install via Plugin Marketplace (Recommended)
 - Go to Main Menu > Plugin Marketplace in Mattermost
 - Search for "Custom Attributes" or manually find the plugin from the list and click **Install**
 - After the plugin has downloaded and been installed, click the **Configure** button
 - Set **Enable Plugin** to **True**, then click "Save" at the bottom of the screen
 - Proceed to Configure your Attribute rules
 
 ## Configuration
 
Before you start, Identify the attributes you want to display on a user's profile popover.  These can contain emojis. Some examples could be "Timezone:PST", "Development Team", "Executive Team Member", "Mentor", etc. then Identify the groups, teams or particular usernames that should display those atrributes.  A spreadsheet can help to organize things.

1. Click "Add Custom Attribute" button, a text box will appear.  Add the text that would appear in the user's profile popover. The text supports markdown and could include emojis and/or links, i.e. "[Integrations Team](https://developers.mattermost.com/internal/rd-teams/#integrations-team)"
![2020-04-14_12-12-46](https://user-images.githubusercontent.com/915956/79266979-3e3d2e80-7e4d-11ea-8a4d-80f78bd81d79.png)
2. Specify which users should have that attribute displayed on their profile.  You can specify individual users, a Mattermost team name, or a Mattermost group ID (this ID needs to be copy/pasted from the group).  The Mattermost group could be synched with an LDAP group to dynamically display attributes to user profiles, based on which LDAP group they currently belong to (this requires an E20 licence to enable AD/LDAP Groups). 
![2020-06-21_22-51-13](https://user-images.githubusercontent.com/45119518/85234976-a726c100-b411-11ea-9477-7133c6a6d45b.png)


3. Click "Save"

## Example

Here are some example rules for two users:

![2020-04-14_12-18-50](https://user-images.githubusercontent.com/915956/79267023-4eeda480-7e4d-11ea-9279-e77c97d737be.png)

Their respective profile popovers display their information:

![2020-04-14_12-19-24](https://user-images.githubusercontent.com/915956/79267480-169a9600-7e4e-11ea-8c04-4775a395ff5b.png)


# Version 1.10 and Below instructions

## Configuration

1. Go to **System Console > Plugins > Management** and click **Enable** to enable the Customer Attributes plugin.
    - If you are running Mattermost v5.11 or earlier, you must first go to the [releases page of this GitHub repository](https://github.com/mattermost/mattermost-plugin-custom-attributes/releases), download the latest release, and upload it to your Mattermost instance [following this documentation](https://docs.mattermost.com/administration/plugins.html#plugin-uploads).

2. Modify your `config.json` file to include your custom attributes, under the `PluginSettings`. See below for an example of what this should look like.

## Usage

To add a custom attribute, edit your `config.json` file and add a "CustomAttributes" field. This field contains an array of the attributes you want to add.

An attribute should have a `Name` field for what is displayed in the user interface as the attribute and an array of `UserIDs` for the users this attribute should apply to. The `Name` field can include Markdown, emojis and links.

You can fill an array of Mattermost team ID's to the `TeamIDs` parameter, and the `Name` will then be displayed
for all members of these teams.

You can also add an array of Mattermost group ID's to the `GroupIDs` parameter. The `Name` will then be displayed
for all members who are apart of that group.

Below is an example:


```
"PluginSettings": {
    ...
    "Plugins": {
        "com.mattermost.custom-attributes": {
            "CustomAttributes": [
                {
                    "Name": ":mattermost: [Core Committer](https://developers.mattermost.com/contribute/getting-started/core-committers/)",
                    "UserIDs": ["someuserID1", "someuserID2"],
                    "TeamIDs": ["someteamID1", "someteamID2"],
                    "GroupIDs":["somegroupID1","somegroupID2"]
                },
                {
                    "Name": ":mattermost: Staff",
                    "UserIDs": ["someuserID3", "someuserID4"],
                    "TeamIDs": ["someteamID3", "someteamID4"],
                    "GroupIDs":["somegroupID3","somegroupID4"]
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

This plugin contains both a server and webapp portion.

Use `make dist` to build distributions of the plugin that you can upload to a Mattermost server.
Use `make check-style` to check the style.
Use `make deploy` to deploy the plugin to your local server.

For additional information on developing plugins, refer to [our plugin developer documentation](https://developers.mattermost.com/extend/plugins/).
