import React from 'react';

function Section({ id, title, children }) {
    return (
        <section className={`section section--${id}`}>
            <h2>{title}</h2>
            {children}
        </section>
    );
}

export default Section;
