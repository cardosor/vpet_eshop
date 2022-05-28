const React = require('react');
const DefaultLayout = require('./layout/DefaultLayout');

class Index extends React.Component{
    render(){
        //Object Destructuring
        const {products} = this.props;
        return(
            <DefaultLayout title='Index'>
                <div class='card-deck'>
                        {
                            products.map(product => {
                                return(
                                    <div class="card" key={product._id}>
                                        <img src={product.imgsrc} class="card-img-top" alt=""/>
                                        <div class="card-header">
                                            vPet Name: {product.name} 
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item">Description: {product.des.substring(0,product.des.lastIndexOf(" ",20))+"..."}</li>
                                            <li class="list-group-item">Price: {product.price.toFixed(2)}</li>
                                            <li class="list-group-item">Quantity: {product.qty}</li>
                                        </ul>
                                        <div class="card-body">
                                        <button type="button" data-id={product._id} class="btn btn-primary btnRudPet">
                                        SHOW
                                        </button>
                                        </div>
                                    </div>
                                    
                                    // <li key={product._id}>
                                    //     <p>The <a href={`'/api/v1/vpets/'${product._id}`}> {product.name}'s</a> price is {product.price.toFixed(2)} USD</p>
                                    //     <p>Quantity: {product.qty}</p>
                                    //     <img src={product.imgsrc} alt="" />
                                    //     <form action={`/api/v1/vpets/${product._id}`} method='GET'>
                                    //         <input type="submit" id="s" value="Show"/>                                            
                                    //     </form>
                                    //     <form action={`/api/v1/vpets/${product._id}?_method=DELETE`} method='POST'>
                                    //         <input type="submit" value="DELETE"/>                                            
                                    //     </form>
                                    //     <form action={`/api/v1/vpets/edit/${product._id}`} method='GET'>
                                    //         <input type="submit" value="UPDATE"/>
                                    //     </form>
                                    //     <hr />

                                    // </li>

                                )
                            })
                        }
                </div>
            </DefaultLayout>
        );
    }
}

module.exports = Index;