import { T, world } from "../../lib/timeline-monad/code/dist/timeline-monad.js";
import { h, patch } from "../../lib/superfine/src/index.js";


const main = () => {

  const topNodeTL = T(self =>
    self.now =
    <div>
      <h2 class="mdc-typography--headline2">
        Flawlessly with Material Design</h2>
      <div class="main">
        <div class="mdc-layout-grid login-box mdc-elevation--z6">
          <h1>Login</h1>
          <div class="mdc-text-field username">
            <input type="text"
              class="mdc-text-field__input"
              id="username-input"
              name="username"
              required />
            <label class="mdc-floating-label" for="username-input">Username</label>
            <div class="mdc-line-ripple"></div>
          </div>

          <div class="mdc-text-field password">
            <input type="password"
              class="mdc-text-field__input"
              id="password-input"
              name="password"
              required minlength="8" />
            <label class="mdc-floating-label" for="password-input">Password</label>
            <div class="mdc-line-ripple"></div>
          </div>

          <div class="mdc-form-field">
            <div class="mdc-checkbox">
              <input type="checkbox"
                class="mdc-checkbox__native-control"
                id="checkbox-1"
                asp-for="RememberLogin" />
              <div class="mdc-checkbox__background">
                <svg class="mdc-checkbox__checkmark"
                  viewBox="0 0 24 24">
                  <path class="mdc-checkbox__checkmark-path"
                    fill="none"
                    d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                </svg>
                <div class="mdc-checkbox__mixedmark"></div>
              </div>
            </div>
            <label for="checkbox-1" asp-for="RememberLogin">
              <strong>Remember My Login</strong>
            </label>
          </div>

          <div class="button-container">
            <button type="button" class="mdc-button cancel">
              Cancel
          </button>
            <button class="mdc-button mdc-button--raised next">
              Next
          </button>
          </div>

        </div>
      </div>
    </div>
  );

  const viewNodeTL = topNodeTL.sync(node =>
    patch(document.getElementById("app"), node)
  );

  const mdcTL = viewNodeTL.sync(() => {

    Array.from(document
      .querySelectorAll('.mdc-text-field'))
      .map(textField =>
        (window as any).mdc.textField
          .MDCTextField.attachTo(textField));

    Array.from(document
      .querySelectorAll('.mdc-button'))
      .map(button =>
        (window as any).mdc.ripple
          .MDCRipple.attachTo(button));

  });

  world.now = topNodeTL;

};

main();