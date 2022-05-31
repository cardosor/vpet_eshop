const React = require('react')

class DefaultLayoutShop extends React.Component{
    
    render(){
        console.log(this.props.title);
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
                <script src="/js/scriptshop.js" defer></script>

            </head>
            <body>
                <ul className="nav nav-pills justify-content-center">
                    <li className="nav-item">
                        <a className={this.props.title === "Shop"? "nav-link active" : "nav-link" } id="btnPets" name="shop" href="#">Shop vPets </a>
                    </li>
                    <li className="nav-item">
                        <a className={this.props.title === "Dashboard"? "nav-link active" : "nav-link" } id="btnDash" name="dash" href="#"> Dashboard</a>
                    </li>
                    
                </ul>
                {this.props.children}
                <div class="modal fade" id="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalTitle">Show vPet</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalTop"></button>
                    </div>
                        <div class="modal-body">
                        <div class="card" id="showPetCard">
                            <img src="" class="card-img-top pet-show" data-name="imgsrc" alt=""/>
                            <div class="card-header pet-show" data-display="vPet Name" data-name="name">
                                vPet Name:
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item pet-show" data-display="Description" data-name="des">Description: </li>
                            </ul>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
            </body>
            </html>
        );
    }

}
module.exports = DefaultLayoutShop;