## Setup

1. Run 'npm install' to set up packages
2. Run 'npm start' to start server
    * By default it will be reachable at *(your ip):2282*

___

## Pages
* **Player view**: *(your ip):2282*
  * Create player character entry
  * View other players in initiative order
  * Quick links to custom player pages
* **DM view**: *(your ip):2282/order*
  * View full initiative order
  * Modify entries in order
  * Add other entities to order that are hidden on player view
* **Settings**: *(your ip):2282/settings*
  * Change the current theme
* **Custom player pages**: *(your ip):2282/(character name)*
  * Save/populate DEX modifiers on server

___

## Formatting images.json
images.json is used to customize the initiative tracker and allow the players to have custom images used to represent players in the initiative order

### Example
```
{
    "characters": [
        {
            "name": "Player Char",
            "image": "path/to/image",
            "thumbnail": "./images/path/to/thumbnail",
            "playing": "true"
        },
        {
            "name": "Non-Player Char",
            "thumbnail": "./images/path/to/image"
        }
    ],
    "gravestones": [
        {
            "name": "Char Name",
            "image": "./images/path/to/image"
        }
    ],
    "maps": [
        {
            "name": "Map Name",
            "image": "./images/path/to/image"
        }
    ],
    "backgrounds": [
        {
            "name": "Background Name",
            "image": "./images/path/to/image",
            "color": "[#hexcode or css color tag]",
            "default": true
        }
    ]
}
```

### Objects
* **characters**: Contains images related to player characters
  * **name**: Name used in initiative table
  * **image**: Image displayed as a link on player view page
  * **thumbnail**: Image displayed within initiative order. If not included, will use **image**
  * **playing**: Include element to add image to quick links on player view page
* **gravestones**: Honors a fallen companion by creating a gravestone in the graveyard at the bottom of the player view page
* **maps**: Adds a button to view a map to the header
  * **name**: Button text
* **backgrounds**: Custom backgrounds/themes for the website
  * **name**: Name of the background shown in settings page
  * **color**: Color used as a div background color
  * **default**: Which background to use when first started - only the first default tag in the list will be used
  * **stretchImg**: Stretch the image to fill the screen rather than tile it

*Note: Images should be placed in a subdirectory of* **./public** *and all paths in the file are assumed to be from that directory*