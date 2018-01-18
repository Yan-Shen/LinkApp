import React from 'react';

function FrontPage() {
  return (
    <div className="frontPageContainer">
      <div className = "carosole">
      </div>
      <div className="flex-container-row sologanSection">
        <div className="slogonContainer">
          <h3>Balance Update? You betcha</h3>
          <p>Instant update on how much $ and debt you have </p>
        </div>

        <div className="slogonContainer">
          <h3>Transaction Analysis? Checked</h3>
          <p> Where do I spend my most money? Track spending made easy. </p>
        </div>
        <div className="slogonContainer">
          <h3>Asset Details? Done</h3>
          <p> Detailed breakdown of asset classes </p>
        </div>
      </div>
    </div>
  )
}

export default FrontPage;