# readme-widgets

## Environment Variables

`AM_DEV_TOKEN`: MusicKit Developer Token  
`AM_USER_TOKEN`: MusicKit Music User Token  
`GH_TOKEN`: GitHub Personal Access Token

## Endpoints

### Apple Music Recently Played Widget

[<img src="https://readme-widgets.deno.dev/recently-played" height="150" />](https://readme-widgets.deno.dev/redirect?to=recently-played)  

**URL** `/recently-played`  
**Query Parameters**:
|Name|Type|Required|Default|Description|
|---|---|---|---|---|
|artwork_size|String|no|708|Size of the artwork|
|language|String|no|en-US|Language of Apple Music|

### GitHub Repository Widget

[![readme-widgets](https://readme-widgets.deno.dev/repository?owner=dn1t&repo=readme-widgets)](https://github.com/dn1t/readme-widgets)  

**URL** `/repository`  
**Query Parameters**:
|Name|Type|Required|Default|Description|
|---|---|---|---|---|
|owner|String|yes|-|Owner of the repository|
|repo|String|yes|-|Name of the repository|
|name|String|no|{repo}|Custom name to display on the widget|

### Redirect API

Set this address as where users will be redirected when they click on widgets

**URL** `/redirect`  
**Query Parameters**:
|Name|Type|Required|Default|Description|
|---|---|---|---|---|
|to|"recently-played"|yes|-|The endpoint of the widget the user clicked|
