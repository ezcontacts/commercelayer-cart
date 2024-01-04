import { LineItemsCount } from "@ezcontacts/react-components"
import { FC } from "react"

import { CompanyLogo } from "../CompanyLogo"
import { useSettings } from "../SettingsProvider"

import styles from "./header.module.css"

import accountIcon from "#components/header/images/account-icon.svg"
import arrowDown from "#components/header/images/arrow-down.svg"
import brandOne from "#components/header/images/brand-1.png"
import brandTwo from "#components/header/images/brand-2.png"
import brandThree from "#components/header/images/brand-3.png"
import brandFour from "#components/header/images/brand-4.png"
import cartIcon from "#components/header/images/cart-icon.svg"
import orderIcon from "#components/header/images/order-icon.svg"
import searchIcon from "#components/header/images/search-icon.svg"
import shapeOne from "#components/header/images/shape-1.png"
import shapeTwo from "#components/header/images/shape-2.png"
import shapeThree from "#components/header/images/shape-3.png"
import shapeFour from "#components/header/images/shape-4.png"
import shapeFive from "#components/header/images/shape-5.png"

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const { settings } = useSettings()
  return (
    <header className={styles.main_header}>
      <div className={styles.container}>
        <div className={styles.flex}>
          <div className={styles.logo}>
            <CompanyLogo />
          </div>
          <div className={styles.search_form}>
            <form
              className={styles.form}
              action={`${settings.shopUrl}/search/`}
            >
              <input
                type="text"
                name="keywords"
                className={styles.form_control}
                placeholder="What are you looking for?"
                required
              />
              <button type="submit" className={styles.search_button}>
                <img src={searchIcon} alt="Search Icon" />
              </button>
            </form>
          </div>
          <div className={styles.action_buttons}>
            <a href={`${settings.shopUrl}/account/order-history`}>
              <img src={orderIcon} alt="Reorder Icon" />
              Reorder
            </a>
            <a href={`${settings.shopUrl}/account/account/sign-in`}>
              <img src={accountIcon} alt="Account Icon" />
              Account
            </a>
            <a href="#">
              <LineItemsCount>
                {({ quantity }: { quantity: number }) =>
                  quantity && (
                    <span className={styles.item_count}>{quantity}</span>
                  )
                }
              </LineItemsCount>
              <img
                className={styles.cart_icon}
                src={cartIcon}
                alt="Cart Icon"
              />
              Cart
            </a>
          </div>
        </div>
        <div className={styles.primary_navigation}>
          <ul>
            <li>
              <a href={`${settings.shopUrl}/mens-eyeglasses`}>MEN</a>
            </li>
            <li>
              <a href={`${settings.shopUrl}/womens-eyeglasses`}>WOMEN</a>
            </li>
            <li>
              <a href={`${settings.shopUrl}/childrens-eyeglasses`}>KIDS</a>
            </li>
            <li className={styles.dd}>
              <a href={`${settings.shopUrl}/sunglasses`}>SUNGLASSES</a>
              <span className={styles.dd_icon}>
                <img src={arrowDown} alt="Arrow Down" />
              </span>
              <div className={styles.dropdown}>
                <div className={styles.frame_shape}>
                  <h4 className={styles.title}>FRAME SHAPES</h4>
                  <div className={styles.shapes}>
                    <a href={`${settings.shopUrl}/sunglasses/shape:aviator`}>
                      <img
                        src={shapeOne}
                        alt="sunglasses frame shape aviator"
                      />
                    </a>
                    <a href={`${settings.shopUrl}/sunglasses/shape:rectangle`}>
                      <img
                        src={shapeTwo}
                        alt="sunglasses frame shape rectangle"
                      />
                    </a>
                    <a href={`${settings.shopUrl}/sunglasses/shape:oval`}>
                      <img src={shapeFive} alt="sunglasses frame shape oval" />
                    </a>
                    <a href={`${settings.shopUrl}/sunglasses/shape:cat-eye`}>
                      <img
                        src={shapeFour}
                        alt="sunglasses frame shape cat eye"
                      />
                    </a>
                    <a href={`${settings.shopUrl}/sunglasses/shape:round`}>
                      <img
                        src={shapeThree}
                        alt="sunglasses frame shape round"
                      />
                    </a>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.brands}>
                    <h4 className={styles.title}>FEATURED BRANDS</h4>
                    <div className={styles.grid_2}>
                      <a href={`${settings.shopUrl}/sunglasses/brand:persol`}>
                        <img
                          src={brandOne}
                          alt="sunglasses featured brand persol"
                        />
                      </a>
                      <a href={`${settings.shopUrl}/sunglasses/brand:ray-ban`}>
                        <img
                          src={brandTwo}
                          alt="sunglasses featured brand ray ban"
                        />
                      </a>
                      <a href={`${settings.shopUrl}/sunglasses/brand:gucci`}>
                        <img
                          src={brandThree}
                          alt="sunglasses featured brand gucci"
                        />
                      </a>
                      <a href={`${settings.shopUrl}/sunglasses/brand:coach`}>
                        <img
                          src={brandFour}
                          alt="sunglasses featured brand coach"
                        />
                      </a>
                    </div>
                  </div>
                  <div className={styles.menu_list}>
                    <h4 className={styles.title}>
                      <a href={`${settings.shopUrl}/mens-sunglasses`}>MEN’S</a>
                    </h4>
                    <ul>
                      <li>
                        <a
                          href={`${settings.shopUrl}/mens-sunglasses/brand:carrera`}
                        >
                          Carrera
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/mens-sunglasses/brand:dandg`}
                        >
                          D&G
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/mens-sunglasses/brand:oakley`}
                        >
                          Oakley
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/mens-sunglasses/cat:is-rxable`}
                        >
                          Prescription Sun
                        </a>
                      </li>
                      <li>
                        <a href={`${settings.shopUrl}/mens-sunglasses`}>
                          All men’s
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.menu_list}>
                    <h4 className={styles.title}>
                      <a href={`${settings.shopUrl}/womens-sunglasses`}>
                        WOMEN’S
                      </a>
                    </h4>
                    <ul>
                      <li>
                        <a
                          href={`${settings.shopUrl}/womens-sunglasses/brand:coach`}
                        >
                          Coach
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/womens-sunglasses/brand:kate-spade`}
                        >
                          Kate Spade
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/womens-sunglasses/cat:is-rxable`}
                        >
                          Prescription Sun
                        </a>
                      </li>
                      <li>
                        <a href={`${settings.shopUrl}/womens-sunglasses`}>
                          All Women’s
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.menu_list}>
                    <h4 className={styles.title}>
                      <a href={`${settings.shopUrl}/childrens-sunglasses`}>
                        KID’S
                      </a>
                    </h4>
                    <ul>
                      <li>
                        <a
                          href={`${settings.shopUrl}/childrens-sunglasses/brand:ray-ban-junior`}
                        >
                          Ray-Ban Junior
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/childrens-sunglasses/brand:carrera`}
                        >
                          Carrera
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/childrens-sunglasses/cat:is-rxable`}
                        >
                          Prescription Sun
                        </a>
                      </li>
                      <li>
                        <a href={`${settings.shopUrl}/childrens-sunglasses`}>
                          All Children’s
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className={styles.dd}>
              <a href={`${settings.shopUrl}/eyeglasses`}>EYEGLASSES</a>
              <span className={styles.dd_icon}>
                <img src={arrowDown} alt="Arrow Down" />
              </span>
              <div className={styles.dropdown}>
                <div className={styles.frame_shape}>
                  <h4 className={styles.title}>FRAME SHAPES</h4>
                  <div className={styles.shapes}>
                    <a href={`${settings.shopUrl}/eyeglasses/shape:rectangle`}>
                      <img
                        src={shapeTwo}
                        alt="eyeglasses frame shape rectangle"
                      />
                    </a>
                    <a href={`${settings.shopUrl}/eyeglasses/shape:oval`}>
                      <img src={shapeFive} alt="eyeglasses frame shape oval" />
                    </a>
                    <a href={`${settings.shopUrl}/eyeglasses/shape:cat-eye`}>
                      <img
                        src={shapeFour}
                        alt="eyeglasses frame shape cat eye"
                      />
                    </a>
                    <a href={`${settings.shopUrl}/eyeglasses/shape:round`}>
                      <img
                        src={shapeThree}
                        alt="eyeglasses frame shape round"
                      />
                    </a>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.brands}>
                    <h4 className={styles.title}>FEATURED BRANDS</h4>
                    <div className={styles.grid_2}>
                      <a href={`${settings.shopUrl}/eyeglasses/brand:persol`}>
                        <img
                          src={brandOne}
                          alt="eyeglasses featured brand persol"
                        />
                      </a>
                      <a href={`${settings.shopUrl}/eyeglasses/brand:ray-ban`}>
                        <img
                          src={brandTwo}
                          alt="eyeglasses featured brand ray ban"
                        />
                      </a>
                      <a href={`${settings.shopUrl}/eyeglasses/brand:gucci`}>
                        <img
                          src={brandThree}
                          alt="eyeglasses featured brand gucci"
                        />
                      </a>
                      <a href={`${settings.shopUrl}/eyeglasses/brand:coach`}>
                        <img
                          src={brandFour}
                          alt="eyeglasses featured brand coach"
                        />
                      </a>
                    </div>
                  </div>
                  <div className={styles.menu_list}>
                    <h4 className={styles.title}>
                      <a href={`${settings.shopUrl}/mens-eyeglasses`}>MEN’S</a>
                    </h4>
                    <ul>
                      <li>
                        <a
                          href={`${settings.shopUrl}/mens-eyeglasses/brand:persol`}
                        >
                          Persol
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/mens-eyeglasses/brand:ray-ban`}
                        >
                          Ray-Ban
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/mens-eyeglasses/brand:polo`}
                        >
                          Polo
                        </a>
                      </li>
                      <li>
                        <a href={`${settings.shopUrl}/mens-eyeglasses`}>
                          All men’s
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.menu_list}>
                    <h4 className={styles.title}>
                      <a href={`${settings.shopUrl}/womens-eyeglasses`}>
                        WOMEN’S
                      </a>
                    </h4>
                    <ul>
                      <li>
                        <a
                          href={`${settings.shopUrl}/womens-eyeglasses/brand:sliik`}
                        >
                          Sliik
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/womens-eyeglasses/brand:coach`}
                        >
                          Coach
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/womens-eyeglasses/brand:michael-kors`}
                        >
                          Michael Kors
                        </a>
                      </li>
                      <li>
                        <a href={`${settings.shopUrl}/womens-eyeglasses`}>
                          All Women’s
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.menu_list}>
                    <h4 className={styles.title}>
                      <a href={`${settings.shopUrl}/childrens-eyeglasses`}>
                        KID’S
                      </a>
                    </h4>
                    <ul>
                      <li>
                        <a
                          href={`${settings.shopUrl}/childrens-eyeglasses/brand:juicy-couture`}
                        >
                          Juicy Couture
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/childrens-eyeglasses/brand:ray-ban-junior-vista`}
                        >
                          Ray Ban Junior
                        </a>
                      </li>
                      <li>
                        <a href={`${settings.shopUrl}/childrens-eyeglasses`}>
                          All Children’s
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className={styles.dd}>
              <a href={`${settings.shopUrl}/contact-lenses`}>CONTACT LENSES</a>
              <span className={styles.dd_icon}>
                <img src={arrowDown} alt="Arrow Down" />
              </span>
              <div className={`${styles.dropdown} ${styles.adjust_left}`}>
                <div className={styles.row}>
                  <div className={styles.brands}>
                    <h4 className={styles.title}>FEATURED BRANDS</h4>
                    <div className={styles.grid_2}>
                      <a
                        href={`${settings.shopUrl}/contact-lenses/brand:persol`}
                      >
                        <img
                          src={brandOne}
                          alt="contact-lenses featured brand persol"
                        />
                      </a>
                      <a
                        href={`${settings.shopUrl}/contact-lenses/brand:ray-ban`}
                      >
                        <img
                          src={brandTwo}
                          alt="contact-lenses featured brand ray ban"
                        />
                      </a>
                      <a
                        href={`${settings.shopUrl}/contact-lenses/brand:gucci`}
                      >
                        <img
                          src={brandThree}
                          alt="contact-lenses featured brand gucci"
                        />
                      </a>
                      <a
                        href={`${settings.shopUrl}/contact-lenses/brand:coach`}
                      >
                        <img
                          src={brandFour}
                          alt="contact-lenses featured brand coach"
                        />
                      </a>
                    </div>
                  </div>
                  <div className={`${styles.menu_list} ${styles.full}`}>
                    <h4 className={styles.title}>Popular Brands</h4>
                    <ul className={styles.grid_4}>
                      <li>
                        <a
                          href={`${settings.shopUrl}/contact-lenses/brand:freshlook`}
                        >
                          FreshLook
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/contact-lenses/brand:purevision`}
                        >
                          PureVision
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/contact-lenses/brand:air-optix`}
                        >
                          Air Optix
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/contact-lenses/brand:myday`}
                        >
                          MyDay
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/contact-lenses/brand:biomedics`}
                        >
                          Biomedics
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/contact-lenses/brand:biotrue`}
                        >
                          Biotrue
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/contact-lenses/brand:extreme-h2o`}
                        >
                          Extreme H2O
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/contact-lenses/brand:bausch-and-lomb`}
                        >
                          Bausch & Lomb
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/contact-lenses/brand:frequency`}
                        >
                          Frequency
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/contact-lenses/brand:eiyin-lens`}
                        >
                          EiYIN Lens
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/contact-lenses/brand:dailies`}
                        >
                          Dailies
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/contact-lenses/brand:avaira`}
                        >
                          Avaira
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/contact-lenses/brand:biofinity`}
                        >
                          Biofinity
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/contact-lenses/brand:coopervision`}
                        >
                          CooperVision
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/contact-lenses/brand:proclear`}
                        >
                          Proclear
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/contact-lenses/brand:acuvue`}
                        >
                          Acuvue
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <a href={`${settings.shopUrl}/readers`}>READERS</a>
            </li>
            <li className={styles.dd}>
              <a href={`${settings.shopUrl}/eye-care`}>EYE CARE</a>
              <span className={styles.dd_icon}>
                <img src={arrowDown} alt="Arrow Down" />
              </span>
              <div className={`${styles.dropdown} ${styles.adjust}`}>
                <div className={styles.row}>
                  <div className={styles.brands}>
                    <h4 className={styles.title}>FEATURED BRANDS</h4>
                    <div className={styles.grid_2}>
                      <a href={`${settings.shopUrl}/eye-care/brand:persol`}>
                        <img
                          src={brandOne}
                          alt="eye-care featured brand persol"
                        />
                      </a>
                      <a href={`${settings.shopUrl}/eye-care/brand:ray-ban`}>
                        <img
                          src={brandTwo}
                          alt="eye-care featured brand ray ban"
                        />
                      </a>
                      <a href={`${settings.shopUrl}/eye-care/brand:gucci`}>
                        <img
                          src={brandThree}
                          alt="eye-care featured brand gucci"
                        />
                      </a>
                      <a href={`${settings.shopUrl}/eye-care/brand:coach`}>
                        <img
                          src={brandFour}
                          alt="eye-care featured brand coach"
                        />
                      </a>
                    </div>
                  </div>
                  <div className={`${styles.menu_list} ${styles.full}`}>
                    <h4 className={styles.title}>Categories</h4>
                    <ul className={styles.grid_3}>
                      <li>
                        <a
                          href={`${settings.shopUrl}/collection/dry-eye-relief`}
                        >
                          Dry Eye Relief
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/collection/eyelid-cleaners`}
                        >
                          Eyelid Cleaners
                        </a>
                      </li>
                      <li>
                        <a href={`${settings.shopUrl}/collection/lens-care`}>
                          Lens Care
                        </a>
                      </li>
                      <li>
                        <a href={`${settings.shopUrl}/collection/eye-vitamins`}>
                          Eye Vitamins
                        </a>
                      </li>
                      <li>
                        <a
                          href={`${settings.shopUrl}/collection/contact-lens-care`}
                        >
                          Contact Lens Care
                        </a>
                      </li>
                      <li>
                        <a href={`${settings.shopUrl}/collection/eye-cream`}>
                          Eye Cream
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <a href={`${settings.shopUrl}/eyewear/clearance:yes`}>
                CLEARANCE
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
