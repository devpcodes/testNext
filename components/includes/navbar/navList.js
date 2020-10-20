import { useState } from 'react';

import theme from '../../../resources/styles/theme';
import Link from 'next/link';

const NavList = React.memo(props => {
    const [lv3MobileVisible, setLv3MobileVisible] = useState(false);
    const clickHandler = () => {
        props.toggleList && setLv3MobileVisible(!lv3MobileVisible);
    };

    const openURL = (url, width, height) => {
        window.open(url, '', `width=${width},height=${height}`);
    };

    return (
        <div className="navlist">
            <h6
                className={`navbar__lv2__item__title ${
                    props.toggleList && !lv3MobileVisible ? 'navbar__lv2__item__title--hide' : ''
                }`}
                onClick={clickHandler}
            >
                {props.lv2Data.title}
            </h6>
            <ul className={`navbar__lv3 ${props.toggleList && !lv3MobileVisible ? 'navbar__lv3--hide' : ''}`}>
                {props.lv2Data.items.map((lv3Item, lv3Index) => (
                    <li className="navbar__lv3__item" key={lv3Index}>
                        <Link
                            as={`${lv3Item.url}`}
                            href={
                                lv3Item.isOpen
                                    ? '#'
                                    : `${process.env.NEXT_PUBLIC_SUBPATH}${lv3Item.url}`
                                    ? `${process.env.NEXT_PUBLIC_SUBPATH}${lv3Item.url}`
                                    : '#'
                            }
                            prefetch={false}
                        >
                            <a
                                onClick={
                                    lv3Item.isOpen
                                        ? () =>
                                              openURL(
                                                  `${process.env.NEXT_PUBLIC_SUBPATH}${lv3Item.url}`,
                                                  lv3Item.openWidth,
                                                  lv3Item.openHeight,
                                              )
                                        : ''
                                }
                                target={lv3Item.isBlank ? '_blank' : ''}
                                className="navbar__lv3__item__title"
                            >
                                {lv3Item.title}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>

            <style jsx>{`
                .navlist {
                    width: 122px;
                }

                .navbar__lv2__item__title {
                    font-size: 16px;
                    color: ${theme.colors.secondary};
                    border-bottom: 2px dotted ${theme.colors.secondary};
                    padding: 0 0 10px 0;
                    margin: 0 0 18px 0;
                    font-weight: bold;
                }

                .navbar__lv3 {
                    list-style: none;
                    padding: 0;
                }

                .navbar__lv3__item {
                    margin: 8px 0;
                }

                .navbar__lv3__item__title {
                    font-size: 16px;
                    color: ${theme.colors.darkBg};
                    display: block;
                }

                @media (max-width: ${props.twoColumnPX}px) {
                    .navlist {
                        width: 100%;
                        margin-bottom: 27px;
                    }
                    .navbar__lv2__item__title {
                        margin: 0 0 4px 0;
                    }
                    .navbar__lv3__item {
                        width: 50%;
                        display: inline-block;
                    }
                    .navbar__lv3__item__title:hover {
                        color: ${theme.colors.secondary};
                    }
                }
            `}</style>
        </div>
    );
});

export default NavList;
