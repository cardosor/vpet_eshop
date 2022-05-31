# vpet_eshop
Virtual Pet Shop

About The Project:
The project is an inventory managment system for virtual pets, and it includes a shop the test inventory change.

Built With:
    Node.js
    Express.js
    MongoDB
    React.js
    Bootstrap


Routes for inventory managment:

VERB 		 | 		  PATH 		 |  	 DESCRIPTION
------------ | ------------- | -------------------
GET | /api/v1/vpets/jsonindex | index of vpets |
GET | /api/v1/vpets/json/:id | show page for selected vpets |
GET | /api/v1/vpets/new | page to add vpets |
POST | /api/v1/vpets/json/ | add a vpet |
GET | /api/v1/vpets/:id/edit | page to edit a vPet |
PUT | /api/v1/vpets/json/:id | edit/update a vpets |
DELETE | /api/v1/vpets/json/:id | delete a vpets |

Routes for the shop:

VERB 		 | 		  PATH 		 |  	 DESCRIPTION
------------ | ------------- | -------------------
GET | /api/v1/vpets/shop | Show vPets to buy |
GET | /api/v1/vpets/dashboard | show vpets that has been bought |
GET | /api/v1/vpets/shop/:id | Buy vPet |

Future implementations:

Refacture and clean some of the code.
Style the server render side.
Add CRUD Buttons to server render side.
Create a user login to the shop.