const Donate = () => (
  <div className="container mx-auto text-center">
    <h1 className="text-4xl font-bold mb-4">Donate</h1>
    <p className="text-lg">
      If you enjoyed this game and are interested in supporting ongoing
      development costs, please consider donating!
    </p>
    <br></br>
    <form action="https://www.paypal.com/donate" method="post" target="_blank">
      <input type="hidden" name="business" value="ABYHEBRTYTYQE" />
      <input type="hidden" name="no_recurring" value="1" />
      <input type="hidden" name="currency_code" value="USD" />
      <input
        type="image"
        src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"
        name="submit"
        title="PayPal - The safer, easier way to pay online!"
        alt="Donate with PayPal button"
      />
      <img
        alt=""
        src="https://www.paypal.com/en_US/i/scr/pixel.gif"
        width="1"
        height="1"
      />
    </form>
  </div>
);

export default Donate;
