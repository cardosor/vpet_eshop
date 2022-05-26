const React = require('react')

class DefaultLayout extends React.Component{
    
    render(){
        return(
            <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="/css/bootstrap.css" />
                <link rel="stylesheet" href="/css/styles.css" />
                <title>{this.props.title}</title>
                <script src="/js/bootstrap.bundle.js" defer></script>
                <script src="/js/script.js" defer></script>

            </head>
            <body>
                <ul className="nav nav-pills justify-content-center">
                    
                    {/* <li className="nav-item">
                        <a className="nav-link" id="btnShow" href="#">Show</a>
                    </li> */}
                    <li className="nav-item">
                        <a className="nav-link" id="btnCreate" name="create" href="#"> Create</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" id="btnRead" name="show" href="#"> Read </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="btnUpdate" name="update" href="#">Update</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="btnDelete" name="delete" href="#" >Delete</a>
                    </li>
                </ul>
                {this.props.children}


                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Show vPet</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                        <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="petName" class="form-label">Name</label>
                                <input type="text" class="form-control" name="name" id="petName" aria-describedby="name"/>
                            </div>
                            <div class="mb-3">
                                <label for="petDes" class="form-label">Description</label>
                                <textarea class="form-control" name="des" id="petDes" rows="3"/>
                            </div>
                            <div class="row g-2">
                                <div class="col-md">
                                    <label for="petPrice" class="form-label">Price</label>
                                    <input type="number" step="0.01" class="form-control" name="price" id="petPrice"/>
                                </div>
                                <div class="col-md">
                                    <label for="petQty" class="form-label">Quantity</label>
                                    <input type="number" class="form-control" name="price" id="petQty"/>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="petImgInput" class="form-label">Image</label>
                                <input name="imgsrc" class="form-control" type="file" id="petImgInput"/>
                            </div>
                            <div id="displayPetContainer">
                             <div id="displayPetImage"></div>
                            </div>
                            
                            {/* <button type="submit" class="btn btn-primary">Submit</button> */}
                        </form>
                        {/* <p id="petName">Hello</p>
                        <p id="petPrice">Hello</p>
                        <p id="petQty">Hello</p>
                        <img id="petImage" src="/img/Bird1653502330203.png" alt="" /> */}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" id="btnResetFrom" class="btn btn-warning">Reset</button>
                        <button type="button" id="btnCreateNewPet" class="btn btn-primary">Submit</button>
                    </div>
                    </div>
                </div>
                </div>
            </body>
            </html>
        );
    }

}
module.exports = DefaultLayout;