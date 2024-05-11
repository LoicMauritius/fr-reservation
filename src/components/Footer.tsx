"use client";

import '@/styles/footer.css';

const Footer = () => {

    return(
        <footer>
            <h2>Copyright</h2>
            <p>
                <a className="link" href="https://github.com/LoicMauritius" target="_blank" rel="noopener noreferrer">Mauritius Loïc</a>
                &nbsp;|&nbsp;
                <a className="link" href="https://github.com/cedric-mc/" target="_blank" rel="noopener noreferrer">Mariya Constantine Cédric</a>
                &nbsp;|&nbsp;
                <a className="link" href="https://github.com/Abdelrahim-Riche" target="_blank" rel="noopener noreferrer">Riche Abdelrahim</a>
                &nbsp;|&nbsp;
                <a className="link" href="https://github.com/LaxhP" target="_blank" rel="noopener noreferrer">Pushpakumar Laxhan</a>
            </p>
        </footer>
    );
}

export default Footer;