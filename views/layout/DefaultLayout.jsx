const React = require('react')

class DefaultLayout extends React.Component{
    
    render(){
        return(
            <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="/css/styles.css" />
                <title>{this.props.title}</title>
                <script src="/js/script.js" defer></script>
            </head>
            <body>
                <h1>{this.props.title}</h1>
                {this.props.children}
            </body>
            </html>
        );
    }

}
module.exports = DefaultLayout;