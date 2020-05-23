import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../_session';
import * as ROUTES from '../_constants/routeConstants';
import * as ROLES from '../_constants/roles';
import { MenuItem, ListItemIcon, Menu } from '@material-ui/core';
import { FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { IoIosMore } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { withFirebase } from '../_firebase';

const Navigation = props => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? (
                <>
                    <NavigationAuth
                        authUser={authUser}
                        firebase={props.firebase}
                    />
                </>
            ) : (
                <NavigationNoAuth firebase={props.firebase} />
            )
        }
    </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser, firebase }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [logo, setLogo] = useState('');

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        firebase
            .getLogo()
            .getDownloadURL()
            .then(url => {
                setLogo(url);
            });
    }, [firebase]);

    return (
        <nav className="navbar navbar-expand-lg navigator">
            <a className="navbar-brand" href="/">
                <img src={logo} width="50" height="50" alt="" />
            </a>
            {/* TODO  button doesnt work import bootstrap js also add redux as dependency*/}
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link " href={ROUTES.LANDING}>
                            Home
                        </a>
                    </li>
                    {authUser.role === ROLES.PATIENT ||
                    authUser.role === ROLES.DOCTOR ? (
                        <li className="nav-item">
                            <a className="nav-link" href={ROUTES.FORUM}>
                                Forum
                            </a>
                        </li>
                    ) : null}
                    {authUser.role === ROLES.PATIENT ||
                    authUser.role === ROLES.DOCTOR ? (
                        <li className="nav-item">
                            <a className="nav-link" href={ROUTES.MEETINGS}>
                                Meetings
                            </a>
                        </li>
                    ) : null}
                    {authUser.role === ROLES.PATIENT ? (
                        <li className="nav-item">
                            <a className="nav-link" href={ROUTES.DOCTOR_LIST}>
                                Doctors
                            </a>
                        </li>
                    ) : null}
                    {authUser.role === ROLES.DOCTOR ||
                    authUser.role === ROLES.PATIENT ? (
                        <li className="nav-item">
                            <a className="nav-link" href={ROUTES.RESERVATIONS}>
                                Reservations
                            </a>
                        </li>
                    ) : null}
                </ul>
                <ul className="navbar-nav dots">
                    <IconContext.Provider
                        value={{ color: 'white', size: '2em' }}
                    >
                        <div>
                            <IoIosMore onClick={handleClick} />
                        </div>
                    </IconContext.Provider>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        getContentAnchorEl={null}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <FaUserAlt fontSize="small" />
                            </ListItemIcon>
                            <li>
                                <Link
                                    onClick={() => setAnchorEl(null)}
                                    to={
                                        authUser.role === ROLES.DOCTOR ||
                                        authUser.role === ROLES.PATIENT
                                            ? ROUTES.PROFILE
                                            : null
                                    }
                                >
                                    Profile
                                </Link>
                            </li>
                        </MenuItem>

                        {authUser &&
                        authUser.role &&
                        authUser.role === ROLES.ADMIN ? (
                            <MenuItem>
                                <ListItemIcon>
                                    <FaUserAlt fontSize="small" />
                                </ListItemIcon>
                                <li>
                                    <Link
                                        onClick={() => setAnchorEl(null)}
                                        to={ROUTES.ADMIN}
                                    >
                                        Admin
                                    </Link>
                                </li>
                            </MenuItem>
                        ) : null}

                        <SignOut firebase={firebase} onClick={setAnchorEl} />
                    </Menu>
                </ul>
            </div>
        </nav>
    );
};

const NavigationDoctor = ({ authUser, firebase }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [logo, setLogo] = useState('');

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        firebase
            .getLogo()
            .getDownloadURL()
            .then(url => {
                setLogo(url);
            });
    }, [firebase]);

    return (
        <nav className="navbar navbar-expand-lg navigator">
            <a className="navbar-brand" href="/">
                <img src={logo} width="50" height="50" alt="" />
            </a>
            {/* TODO  button doesnt work import bootstrap js also add redux as dependency*/}
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link " href={ROUTES.LANDING}>
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={ROUTES.FORUM}>
                            Forum
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={ROUTES.MEETINGS}>
                            Meetings
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav dots">
                    <IconContext.Provider
                        value={{ color: 'white', size: '2em' }}
                    >
                        <div>
                            <IoIosMore onClick={handleClick} />
                        </div>
                    </IconContext.Provider>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        getContentAnchorEl={null}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <FaUserAlt fontSize="small" />
                            </ListItemIcon>
                            <li>
                                <Link
                                    onClick={() => setAnchorEl(null)}
                                    to={ROUTES.PROFILE}
                                >
                                    Profile
                                </Link>
                            </li>
                        </MenuItem>
                        <SignOut firebase={firebase} onClick={setAnchorEl} />
                    </Menu>
                </ul>
            </div>
        </nav>
    );
};

const NavigationPatient = ({ authUser, firebase }) => {};

const NavigationAdmin = ({ authUser, firebase }) => {};

const NavigationNoAuth = ({ firebase }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [logo, setLogo] = useState('');

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        firebase
            .getLogo()
            .getDownloadURL()
            .then(url => {
                setLogo(url);
            });
    }, [firebase]);

    return (
        <nav className="navbar navbar-expand-lg navigator">
            <a className="navbar-brand" href="/">
                <img src={logo} width="50" height="50" alt="" />
            </a>
            {/* TODO  button doesnt work import bootstrap js also add redux as dependency*/}
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link " href={ROUTES.LANDING}>
                            Home
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav dots">
                    <IconContext.Provider
                        value={{ color: 'white', size: '2em' }}
                    >
                        <div>
                            <IoIosMore onClick={handleClick} />
                        </div>
                    </IconContext.Provider>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        getContentAnchorEl={null}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={() => setAnchorEl(null)}>
                            <ListItemIcon>
                                <FaSignOutAlt fontSize="small" />
                            </ListItemIcon>
                            <li>
                                <Link to={ROUTES.SIGN_IN}>SignIn</Link>
                            </li>
                        </MenuItem>
                    </Menu>
                </ul>
            </div>
        </nav>
    );
};

const SignOut = props => (
    <MenuItem onClick={() => props.onClick(null)}>
        <ListItemIcon>
            <FaSignOutAlt fontSize="small" />
        </ListItemIcon>
        <li>
            <div onClick={props.firebase.doSignOut}>Sign Out</div>
        </li>
    </MenuItem>
);

export default withFirebase(Navigation);
