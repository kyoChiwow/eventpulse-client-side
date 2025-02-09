const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by EventPulse
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
