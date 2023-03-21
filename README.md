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
            "thumbnail": "./public/images/path/to/thumbnail",
            "playing": "true"
        },
        {
            "name": "Non-Player Char",
            "thumbnail": "./public/images/path/to/image"
        }
    ],
    "gravestones": [
        {
            "name": "Char Name",
            "image": "./public/images/path/to/image"
        }
    ],
    "maps": [
        {
            "name": "Map Name",
            "image": "./public/images/path/to/image"
        }
    ]
}
```

### Objects
* **characters**: Contains images related to player characters
  * **name**: Name used in initiative table
  * **image**: Image displayed as a link on player view page
  * **thumbnail**: Image displayed within initiative order
  * **playing**: Include element to add image to quick links on player view page
* **gravestones**: Honors a fallen companion by creating a gravestone in the graveyard at the bottom of the player view page
* **maps**: Adds a button to view a map to the header
  * **name**: Button text

*Note: Images should be placed in a subdirectory of* **./public/images**