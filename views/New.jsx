const React = require('react');
const DefaultLayout = require('./layout/DefaultLayout');

class New extends React.Component{
    render(){
        return(
            <DefaultLayout title='New'>
                <a href="/api/v1/vpets">Back</a>
                <form action="/api/v1/vpets" encType="multipart/form-data" method='POST'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name"/>
                    <label htmlFor="des">Description:</label>
                    <input type="text" id="des" name="des"/>
                    <label htmlFor="price">Price:</label>
                    <input type="number" step="0.01" id="price" name="price"/>
                    <label htmlFor="price">Quantaty:</label>
                    <input type="number" id="qty" name="qty"/>
                    <label htmlFor="imgsrc">Image (.PNG or .JPG only):</label>
                    <input type="file" id="imgsrc" name="imgsrc" accept="image/*"/>
                    <hr />
                    <input type="submit" value="Create vPet"/>
                </form>
            </DefaultLayout>
        );
    }
}

module.exports = New;