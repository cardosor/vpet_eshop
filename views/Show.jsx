const React = require('react');
const DefaultLayout = require('./layout/DefaultLayout');

class Index extends React.Component{
    render(){
        //Object Destructuring
        const {product} = this.props;
        return(
            <DefaultLayout title='Index'>
                <div>
                    <nav>
                        <a href="/api/v1/vpets/"> Back </a>
                    </nav>
                    <ul>
                        <li key={product._id}>
                            <p>The <a href={`'/api/v1/vpets/'${product._id}`}> {product.name}'s</a> price is {product.price.toFixed(2)} USD</p>
                            <p>Quantity: {product.qty}</p>
                            <img src={product.imgsrc} alt="" />
                            <form action={`/api/v1/vpets/${product._id}?_method=DELETE`} method='POST'>
                                <input type="submit" value="DELETE"/>                                            
                            </form>
                            <hr />
                            <form action={`/api/v1/vpets/edit/${product._id}`} method='GET'>
                                <input type="submit" value="UPDATE"/>
                            </form>
                        </li>
                    </ul>
                </div>
            </DefaultLayout>
        );
    }
}

module.exports = Index;