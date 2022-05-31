const React = require('react');
const DefaultLayoutShop = require('./layout/DefaultLayoutShop');

class Shop extends React.Component{
    render(){
        //Object Destructuring
        const {pets} = this.props;
        return(
            <DefaultLayoutShop title='Dashboard'>
                <div class='card-deck' id="cardDeck">
                {
                    pets.map(pet => {
                        return(
                            <div class="card" key={pet._id}>
                                <img src={pet.imgsrc} class="card-img-top" alt=""/>
                                <div class="card-header">
                                    vPet Name: {pet.name} 
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Description: {pet.des.length > 20 ? pet.des.substring(0,pet.des.lastIndexOf(" ",20))+"..." : pet.des }</li>
                                </ul>
                                <div class="card-body">
                                <button type="Show" data-id={pet.product_id} class="btn btn-primary btnShowPet">
                                Show
                                </button>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </DefaultLayoutShop>
        );
    }
}

module.exports = Shop;