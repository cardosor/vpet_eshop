const React = require('react');
const DefaultLayout = require('./layout/DefaultLayout');

class Index extends React.Component{
    render(){
        return(
            <DefaultLayout title='Index'>
                <div class="spinner-border text-success" role="status" id="indexSpinner">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class='card-deck' id="cardDeck">
                </div>
            </DefaultLayout>
        );
    }
}

module.exports = Index;