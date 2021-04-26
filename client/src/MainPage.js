import React from 'react';
import './MainPage.css';

export default function MainPage(props) {

  return (
    <div>
      <h1>Birdy</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quaerat quo temporibus, deserunt perspiciatis cumque, omnis est at quia suscipit esse molestiae quod placeat, illo explicabo quam libero illum aliquam.
      </p>
      <button onClick={props.logout}>Se déconnecter</button>
    </div>
  );
}
