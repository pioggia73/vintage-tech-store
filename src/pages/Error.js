import React from "react";
import {Link} from 'react-router-dom';

export default function Error() {

  return  <section className="section error-page" >
              <div className="error-container">
                <h1>Ooops! It's a dead end</h1>
                <Link to='/' className="btn btn-primary">Go back home</Link>
              </div>
          </section>
}
