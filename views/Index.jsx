const React = require('react');
const DefaultLayout = require('./layout/DefaultLayout');

class Index extends React.Component{
    render(){
        //Object Destructuring
        const {products} = this.props;
        return(
            <DefaultLayout title='Index'>
                <div class='card-deck' id="cardDeck">
                {
                    products.map(product => {
                        return(
                            <div class="card" key={product._id}>
                                <img src={product.imgsrc} class="card-img-top" alt=""/>
                                <div class="card-header">
                                    vPet Name: {product.name} 
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Description: {product.des.length > 20 ? product.des.substring(0,product.des.lastIndexOf(" ",20))+"..." : product.des }</li>
                                    <li class="list-group-item">Price: {product.price.toFixed(2)}</li>
                                    <li class="list-group-item">Quantity: {product.qty}</li>
                                </ul>
                                <div class="card-body">
                                <button type="button" data-id={product._id} class="btn btn-primary btnRudPet">
                                SHOW
                                </button>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </DefaultLayout>
        );
    }
}

module.exports = Index;