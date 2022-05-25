const React = require('react');
const DefaultLayout = require('./layout/DefaultLayout');

class Edit extends React.Component{
    render(){
        const {product} = this.props;
        return(
            <DefaultLayout title='New'>
                <a href="/api/v1/vpets">Back</a>
                <form action={`/api/v1/vpets/${product._id}?_method=PUT`} encType="multipart/form-data" method='POST'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" defaultValue={product.name} name="name"/>
                    <label htmlFor="des">Description:</label>
                    <input type="text" id="des" defaultValue={product.des} name="des"/>
                    <label htmlFor="price">Price:</label>
                    <input type="number" step="0.01" id="price" defaultValue={product.price.toFixed(2)} name="price"/>
                    <label htmlFor="price">Quantaty:</label>
                    <input type="number" id="qty" defaultValue={product.qty} name="qty"/>
                    <label htmlFor="imgsrc">Image (.PNG or .JPG only):</label>
                    <img src={product.imgsrc} alt="" />
                    <input type="text" id="origFilePath" name="imgsrc" defaultValue={product.imgsrc}/>
                    <input type="file" id="imgupdate" name="imgupdate" accept="image/*"/>
                    <hr />
                    <input type="submit" value="Update vPet"/>
                </form>
            </DefaultLayout>
        );
    }
}

module.exports = Edit;