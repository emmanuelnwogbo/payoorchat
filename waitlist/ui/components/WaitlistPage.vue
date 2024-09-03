<template>
  <div class="waitlist">
    <input ref="blank" class="blank" v-model="nigerianstatesearch" />

    <div class="waitlist__emailsent" v-if="feedbackopen">
      <div class="waitlist__emailsent--text">
        <div class="waitlist__emailsent--svgarea">
          <div class="waitlist__emailsent--logo">
            <img src="@/assets/imgs/logo-white-back.jpeg" />
          </div>
          <span class="waitlist__emailsent--svg" @click="closefeedback">
            <svg class="feature__icon">
              <use xlink:href="@/assets/imgs/sprite.svg#icon-x-altx-alt"></use>
            </svg>
          </span>
        </div>
        <p>Thanks for signing up to our waitlist</p>
        <p>kindly check your mail for a message from us</p>
      </div>
    </div>

    <div class="waitlist__emailsent" v-if="servererrormessage">
      <div class="waitlist__emailsent--text">
        <div class="waitlist__emailsent--svgarea">
          <div class="waitlist__emailsent--logo">
            <img src="@/assets/imgs/logo-white-back.jpeg" />
          </div>
          <span class="waitlist__emailsent--svg" @click="closefeedback">
            <svg class="feature__icon">
              <use xlink:href="@/assets/imgs/sprite.svg#icon-x-altx-alt"></use>
            </svg>
          </span>
        </div>
        <p>{{ servererrormessage }}</p>
      </div>
    </div>

    <div class="waitlist__content">
      <div class="waitlist__photo waitlist__flexarea">
        <div class="waitlist__textimg">
          <figure class="waitlist__logo logo">
            <img src="@/assets/imgs/payoor-white.svg" />
          </figure>

          <div class="waitlist__socials">
            <span class="desktop-social-svg" @click="openInstagramLink">
              <svg class="feature__icon">
                <use xlink:href="@/assets/imgs/sprite.svg#icon-instagram"></use>
              </svg>
            </span>
            <span class="desktop-social-svg" @click="openTwitterLink">
              <svg class="feature__icon">
                <use xlink:href="@/assets/imgs/sprite.svg#icon-twitter"></use>
              </svg>
            </span>
          </div>

          <h3 class="waitlist__h3">
            <div
              class="waitlist__line"
              :class="{
                center: current === 1,
                left: current === 2,
                right: current === 3,
                offcreen: current === 2 || current === 3,
              }"
            >
              <span> Your grocery </span>
              <span> shouldn’t have </span>
              <span> a tragic </span>
              <span> back story </span>
            </div>
            <div
              class="waitlist__line"
              :class="{
                center: current === 2,
                left: current === 3,
                right: current === 1,
                offcreen: current === 3 || current === 1,
              }"
            >
              <span> "Eyaah, sorry </span>
              <span> madame" </span>
            </div>
            <div
              class="waitlist__line"
              :class="{
                center: current === 3,
                left: current === 1,
                right: current === 2,
                offcreen: current === 2 || current === 1,
              }"
            >
              <span> "You no go fit </span>
              <span> park for here" </span>
            </div>
          </h3>
        </div>
        <figure class="waitlist__image">
          <img
            src="@/assets/imgs/bike desktop.png"
            class="bike"
            :class="{
              center: current === 1,
              left: current === 2,
              right: current === 3,
              offcreen: current === 2 || current === 3,
            }"
          />
        </figure>
        <figure class="waitlist__image">
          <img
            src="@/assets/imgs/mud desktop.png"
            class="mudsplash"
            :class="{
              center: current === 2,
              left: current === 3,
              right: current === 1,
              offcreen: current === 3 || current === 1,
            }"
          />
        </figure>
        <figure class="waitlist__image">
          <img
            src="@/assets/imgs/POLICE 1.png"
            class="police"
            :class="{
              center: current === 3,
              left: current === 1,
              right: current === 2,
              offcreen: current === 2 || current === 1,
            }"
          />
        </figure>
      </div>
      <div class="form waitlist__formarea waitlist__flexarea">
        <div class="fixed-header-white mobile">
          <figure class="waitlist__logo logo mobile">
            <img src="@/assets/imgs/payoor-green-two.svg" />
          </figure>
        </div>

        <div class="formbody">
          <div class="formarea">
            <div class="inputbox">
              <input
                class="inputbox__input"
                type="text"
                placeholder=""
                v-model="firstname"
              />
              <label
                class="inputbox__label"
                :class="{
                  errortext: firstnameError,
                }"
              >
                First name
              </label>
            </div>
            <div class="inputbox">
              <input
                class="inputbox__input"
                type="text"
                placeholder=""
                v-model="lastname"
              />
              <label
                class="inputbox__label"
                :class="{
                  errortext: lastnameError,
                }"
              >
                Last name
              </label>
            </div>
          </div>

          <div class="formarea">
            <div class="inputbox full">
              <input
                class="inputbox__input"
                type="email"
                placeholder=""
                v-model="email"
              />
              <label
                class="inputbox__label"
                :class="{
                  errortext: emailError,
                }"
              >
                Email
              </label>
            </div>
          </div>

          <div class="formarea">
            <div class="inputbox full">
              <input
                class="inputbox__input"
                type="text"
                placeholder=""
                v-model="phonenumber"
              />
              <label
                class="inputbox__label"
                :class="{
                  errortext: phonenumberError,
                }"
              >
                Phone number
              </label>
            </div>
          </div>

          <div class="formarea withdropdown">
            <div class="inputbox">
              <span class="inputbox__dropdownsvg" @click.stop="toggledropdown">
                <svg class="">
                  <use xlink:href="@/assets/imgs/sprite.svg#icon-chevron-down"></use>
                </svg>
              </span>
              <div class="input__dropdown" v-if="dropdownopn">
                <div
                  v-for="nigerianstate in nigerianstateslist"
                  class="input__dropdown--item"
                  @click.stop="toggledropdown({ nigerianstate })"
                  :key="nigerianstate"
                >
                  {{ nigerianstate }}
                </div>
              </div>
              <input
                class="inputbox__input dropdown"
                type="text"
                placeholder=""
                v-model="state"
                ref="nigerianstate"
              />
              <label class="inputbox__label"> State </label>
            </div>
            <div class="inputbox">
              <input class="inputbox__input" type="text" placeholder="" v-model="city" />
              <label
                class="inputbox__label"
                :class="{
                  errortext: cityError,
                }"
              >
                City
              </label>
            </div>
          </div>

          <div class="formarea">
            <div class="inputbox full">
              <div class="waitlist-options">
                <span
                  class="waitlist-option"
                  v-for="option in options"
                  @click="selectoption(option)"
                  :class="{ greencolor: selectedoptions.includes(option) }"
                  :key="option"
                  >{{ option }}</span
                >
              </div>
              <label
                class="inputbox__label greencolor"
                :class="{
                  errortext: selectedoptionsError,
                }"
              >
                What is most important to you when you shop for foodstuff?
              </label>
            </div>
          </div>

          <div class="formarea button-area">
            <div class="inputbox full" v-if="allowsubmit && !submitting" @click="submit">
              <button class="button primary">Join waitlist</button>
            </div>
            <div class="inputbox full" v-if="!allowsubmit && !submitting">
              <button class="button primary faint">Join waitlist</button>
            </div>
            <div class="inputbox full" v-if="submitting">
              <button class="button primary faint loading">
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      servererrormessage: null,
      nigerianstatesearch: "",
      submitting: false,
      feedbackopen: false,
      current: 1,
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      state: "",
      city: "",
      selectedoptions: [],
      firstnameError: null,
      lastnameError: null,
      emailError: null,
      phonenumberError: null,
      stateError: null,
      cityError: null,
      selectedoptionsError: null,
      options: ["Save time", "Save money", "Eat healthy", "Improve my cooking routine"],
      nigerianstates: [
        "AbujaFCT",
        "Abia",
        "Adamawa",
        "Akwa Ibom",
        "Anambra",
        "Bauchi",
        "Bayelsa",
        "Benue",
        "Borno",
        "Cross River",
        "Delta",
        "Ebonyi",
        "Edo",
        "Ekiti",
        "Enugu",
        "Gombe",
        "Imo",
        "Jigawa",
        "Kaduna",
        "Kano",
        "Katsina",
        "Kebbi",
        "Kogi",
        "Kwara",
        "Lagos",
        "Nasarawa",
        "Niger",
        "Ogun",
        "Ondo",
        "Osun",
        "Oyo",
        "Plateau",
        "Rivers",
        "Sokoto",
        "Taraba",
        "Yobe",
        "Zamfara",
      ],
      nigerianstateslist: [
        "AbujaFCT",
        "Abia",
        "Adamawa",
        "Akwa Ibom",
        "Anambra",
        "Bauchi",
        "Bayelsa",
        "Benue",
        "Borno",
        "Cross River",
        "Delta",
        "Ebonyi",
        "Edo",
        "Ekiti",
        "Enugu",
        "Gombe",
        "Imo",
        "Jigawa",
        "Kaduna",
        "Kano",
        "Katsina",
        "Kebbi",
        "Kogi",
        "Kwara",
        "Lagos",
        "Nasarawa",
        "Niger",
        "Ogun",
        "Ondo",
        "Osun",
        "Oyo",
        "Plateau",
        "Rivers",
        "Sokoto",
        "Taraba",
        "Yobe",
        "Zamfara",
      ],
      dropdownopn: false,
    };
  },
  computed: {
    allowsubmit() {
      const {
        firstname,
        lastname,
        email,
        phonenumber,
        state,
        city,
        selectedoptions,
      } = this;

      if (
        firstname.length &&
        lastname.length &&
        email.length &&
        phonenumber.length &&
        state.length &&
        city.length &&
        selectedoptions.length
      ) {
        if (
          this.isValidEmail(email.trim()) &&
          this.containsOnlyNumbers(phonenumber.trim()) &&
          this.containsOnlyLetters(firstname.trim()) &&
          this.containsOnlyLetters(lastname.trim()) &&
          this.containsOnlyLetters(state.trim()) &&
          this.containsOnlyLetters(city.trim())
        ) {
          return true;
        }
      }

      return false;
    },
  },
  watch: {
    nigerianstatesearch(newval, oldval) {
      const { nigerianstates } = this;

      if (nigerianstates.length) {
        const searchTerm = this.nigerianstatesearch.trim().toLowerCase();
        const filtered = nigerianstates.filter((nigerianstate) =>
          nigerianstate.trim().toLowerCase().includes(searchTerm)
        );

        this.nigerianstateslist = filtered;
      }
    },
    firstname(newFirstName, oldFirstName) {
      if (!newFirstName.trim().length) {
        this.firstnameError = true;
      } else {
        this.firstnameError = false;
      }
    },
    lastname(newLastName, oldLastName) {
      if (!newLastName.trim().length) {
        this.lastnameError = true;
      } else {
        this.lastnameError = false;
      }
    },
    email(newEmail, oldEmail) {
      if (!this.isValidEmail(newEmail)) {
        this.emailError = true;
      } else {
        this.emailError = false;
      }
    },
    phonenumber(newPhoneNumber, oldPhoneNumber) {
      if (
        !newPhoneNumber.trim().length ||
        !this.containsOnlyNumbers(newPhoneNumber.trim())
      ) {
        this.phonenumberError = true;
      } else {
        this.phonenumberError = false;
      }
    },
    state(newState, oldState) {},
    city(newCity, oldCity) {
      if (!newCity.length) {
        this.cityError = true;
      } else {
        this.cityError = false;
      }
    },
    selectedoptions(newSelectedOptions, oldSelectedOptions) {
      if (!newSelectedOptions.length) {
        this.selectedoptionsError = true;
      } else {
        this.selectedoptionsError = false;
      }
    },
  },
  methods: {
    capitalizeFirstLetter(word) {
      if (!word || typeof word !== "string") {
        return "";
      }

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    },
    closefeedback() {
      this.feedbackopen = false;
      this.servererrormessage = null;
      window.location.reload();
    },
    openTwitterLink() {
      const url = "https://twitter.com/mypayoor?s=11";
      window.open(url, "_blank");
    },
    openInstagramLink() {
      const url = "https://www.instagram.com/mypayoor/?igshid=MzRlODBiNWFlZA%3D%3D";
      window.open(url, "_blank");
    },
    containsOnlyLetters(input) {
      const letterRegex = /^[A-Za-z]+$/;
      return letterRegex.test(input);
    },
    containsOnlyNumbers(input) {
      const numberRegex = /^[0-9]+$/;
      return numberRegex.test(input);
    },
    hasSpecificLength(input, length) {
      return input.length === length;
    },
    isValidEmail(input) {
      const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      return emailRegex.test(input);
    },
    async submit() {
      const currentURL = window.location.href.replace(/\/$/, "");
      let url;

      if (
        currentURL === "http://localhost:3000" ||
        currentURL === "http://localhost:3000/"
      ) {
        url = "http://localhost:3031";
      } else if (
        currentURL === "https://waitlist.payoor.shop" ||
        currentURL === "https://waitlist.payoor.shop/"
      ) {
        url = `${window.location.href}`.replace(/\/$/, "");
      } else {
        url = "http://localhost:3031";
      }

      const {
        firstname,
        lastname,
        email,
        phonenumber,
        state,
        city,
        selectedoptions,
        capitalizeFirstLetter,
      } = this;

      try {
        this.submitting = true;

        const response = await fetch(`${url}/api/waitlist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: capitalizeFirstLetter(firstname),
            lastname,
            email,
            phonenumber,
            state,
            city,
            selectedoptions,
          }),
        });

        const data = await response.json();

        if (data.alreadyregistered) {
          this.servererrormessage = `Looks like you're already in the waitlist`;
        }

        if (data.successmessage) {
          this.submitting = false;
          this.feedbackopen = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    toggledropdown({ nigerianstate }) {
      if (!nigerianstate) {
        this.$refs.blank.focus();
      }

      if (nigerianstate && this.nigerianstates.includes(nigerianstate)) {
        this.state = nigerianstate;
        this.nigerianstateslist = this.nigerianstates;
        this.nigerianstatesearch = "";
        this.$refs.blank.blur();
        this.$refs.nigerianstate.blur();
      }

      return this.dropdownopn ? (this.dropdownopn = false) : (this.dropdownopn = true);
    },
    timefunction() {
      setInterval(() => {
        if (this.current === 3) {
          this.current = 1;
        } else {
          let tracker = this.current;
          tracker += 1;
          this.current = tracker;
        }
      }, 3000);
    },
    selectoption(option) {
      const selectedoptions = this.selectedoptions;

      if (selectedoptions.includes(option)) {
        const filt = selectedoptions.filter((opt) => opt !== option);
        return (this.selectedoptions = filt);
      }

      selectedoptions.push(option);
      this.selectedoptions = selectedoptions;
    },
  },
  mounted() {
    this.timefunction();

    document.querySelector("input").addEventListener("focus", function () {
      document
        .querySelector('meta[name="viewport"]')
        .setAttribute(
          "content",
          "width=device-width, initial-scale=1.0, maximum-scale=1.0"
        );
    });

    document.querySelector("input").addEventListener("blur", function () {
      document
        .querySelector('meta[name="viewport"]')
        .setAttribute("content", "width=device-width, initial-scale=1.0");
    });
  },
};
</script>

<style lang="scss">
.waitlist {
  height: #{scaleValue(1000)};
  background: $white;
  overflow: hidden;

  @media only screen and (max-width: 768px) {
    height: #{scaleValue(3500)};
  }

  &__logo {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;

    @media only screen and (max-width: 768px) {
      //position: relative
    }
  }

  &__content {
    display: flex;
    height: 100%;
  }

  &__flexarea {
    width: 50%;
    height: 100%;

    @media only screen and (max-width: 768px) {
      width: 100%;
    }
  }

  &__textimg {
    position: relative;
    overflow: hidden;
    min-height: #{scaleValue(500)};
  }

  &__socials {
    position: fixed;
    top: #{scaleValue(35)};
    left: #{scaleValue(625)};
    z-index: 20;
    display: flex;
  }

  &__h3 {
    color: $white;
    font-size: #{scaleValue(57)};
    font-weight: 400;
    text-align: center;
    line-height: #{scaleValue(50)};
    position: relative;
    transform: translateY(#{scaleValue(200)});

    display: flex;

    & span {
      display: block;
    }
  }

  &__line {
    flex-shrink: 0;
    width: 100%;
    transition: all 0.5s ease;
    position: absolute;
    left: 0;
    background: $primary-color;

    &.offcreen {
      opacity: 0;
      z-index: 2;
    }

    &.center {
      transform: translateX(0);
      z-index: 2;
    }

    &.left {
      transform: translateX(-100%);
      z-index: 2;
    }

    &.right {
      transform: translateX(100%);
      z-index: 2;
    }
  }

  &__photo {
    background: $primary-color;
    position: relative;

    @media only screen and (max-width: 768px) {
      display: none;
    }
  }

  &__image {
    width: #{scaleValue(800)};
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;

    & img {
      object-fit: cover;
      transition: all 0.5s ease;

      &.bike {
        width: #{scaleValue(1200)};
        transform: translateX(#{scaleValue(-40)});
      }

      &.mudsplash {
        width: #{scaleValue(1150)};
        height: #{scaleValue(730)};
        transform: translateX(#{scaleValue(70)});
      }

      &.police {
        width: #{scaleValue(500)};
      }

      &.offcreen {
        opacity: 0;
        z-index: 2;
      }

      &.center {
        opacity: 1;
      }

      &.left {
        opacity: 0;
      }

      &.right {
        opacity: 0;
      }
    }
  }

  &__formarea {
    position: relative;
    padding: #{scaleValue(20)} #{scaleValue(50)};
    padding-top: #{scaleValue(100)};
    z-index: 8;

    @media only screen and (max-width: 768px) {
      padding: #{scaleValue(20)} #{scaleValue(90)};
      padding-top: #{scaleValue(500)};
    }
  }

  &__emailsent {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 30;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: opacityIn 1s ease-in-out forwards;
    overflow: hidden;

    &--text {
      margin-top: #{scaleValue(90)};
      background: $white;
      padding: #{scaleValue(20)};
      border-radius: #{scaleValue(5)};
      color: $primary-color;
      font-weight: 500;
      font-size: #{scaleValue(15)};
      line-height: #{scaleValue(25)};
      transform: translateY(#{scaleValue(-100)});
      overflow: hidden;

      animation: slideFromTop 1s ease-in-out forwards;
      position: relative;

      & p {
        position: relative;
        z-index: 2;
      }

      @media only screen and (max-width: 768px) {
        padding: #{scaleValue(60)};
        font-size: #{scaleValue(60)};
        line-height: #{scaleValue(100)};
        border-radius: #{scaleValue(15)};
        width: #{scaleValue(1300)};
        transform: translateY(#{scaleValue(-200)});
      }
    }

    &--svgarea {
      display: flex;
      justify-content: space-between;
    }

    &--svg {
      cursor: pointer;

      & svg {
        height: #{scaleValue(15)};
        width: #{scaleValue(15)};
        fill: $primary-color;
        margin-bottom: #{scaleValue(20)};

        @media only screen and (max-width: 768px) {
          height: #{scaleValue(80)};
          width: #{scaleValue(80)};
        }
      }
    }

    &--logo {
      height: #{scaleValue(80)};
      width: #{scaleValue(80)};
      position: relative;
      z-index: 1;
      transform: translateX(#{scaleValue(-30)}) translateY(#{scaleValue(20)});

      @media only screen and (max-width: 768px) {
        height: #{scaleValue(360)};
        width: #{scaleValue(360)};
        transform: translateX(#{scaleValue(-120)}) translateY(#{scaleValue(20)});
      }

      & img {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
