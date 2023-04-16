import {BsFacebook, BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";
function Footer() {
  return (
    <>
      <footer class="bg-dark text-center text-white">
        <div class="container p-4 pb-0">
          <section class="mb-4">
            <a
              class="btn btn-outline-light btn-floating "
              href="#!"
              role="button"
            >
              {/* <i className="fa fa-facebook fa-large" aria-hidden="true"></i> */}
              <BsFacebook/>
            </a>

            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <BsInstagram/>
            </a>

            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <BsTwitter/>
            </a>

            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <BsYoutube/>
            </a>
          </section>
        </div>

        <div class="text-center p-3">© 2023 TicketBook</div>
      </footer>
    </>
  );
}

export default Footer;
