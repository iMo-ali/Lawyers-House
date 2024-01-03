import React from "react";

export default function documentgeneration() {
  return (
    <>
      <section className="doc-container">
        <h1 className="text-black">Create An Automated Document</h1>

        <br />
        <div className="Selection">
          <ul className="menu lg:menu-horizontal bg-base-200 rounded-box lg:mb-64">
            <li>
              <a>Please choose the document type</a>
            </li>
            <li>
              <details>
                <summary>Select Doc Type</summary>
                <ul>
                  <li>
                    <a>Non-disclosure agreement (NDA)</a>
                  </li>
                  <li>
                    <a>Contract</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>

          <ul className="menu lg:menu-horizontal bg-base-200 rounded-box lg:mb-64">
            <li>
              <a>Please choose the client</a>
            </li>
            <li>
              <details>
                <summary>Select Client</summary>
                <ul>
                  <li>
                    <a>Mohammed</a>
                  </li>
                  <li>
                    <a>Hazem</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
