const React = require('react');
const DefaultLayout = require('./layout/DefaultLayout');

class Index extends React.Component{
    render(){
        //Object Destructuring
        const {products} = this.props;
        return(
            <DefaultLayout title='Index'>
                <div>
                    <nav>
                        <a href="/api/v1/vpets/new"> Create a new product </a>
                    </nav>
                    <ul>
                        {
                            products.map(product => {
                                return(
                                    <li key={product._id}>
                                        <p>The <a href={`'/api/v1/vpets/'${product._id}`}> {product.name}'s</a> price is {product.price.toFixed(2)} USD</p>
                                        <p>Quantity: {product.qty}</p>
                                        <img src={product.imgsrc} alt="" />
                                        <form action={`/api/v1/vpets/${product._id}`} method='GET'>
                                            <input type="submit" value="Show"/>                                            
                                        </form>
                                        <form action={`/api/v1/vpets/${product._id}?_method=DELETE`} method='POST'>
                                            <input type="submit" value="DELETE"/>                                            
                                        </form>
                                        <form action={`/api/v1/vpets/edit/${product._id}`} method='GET'>
                                            <input type="submit" value="UPDATE"/>
                                        </form>
                                        <hr />

                                    </li>

                                )
                            })
                        }
                    </ul>
                </div>
            </DefaultLayout>
        );
    }
}

module.exports = Index;