import React from 'react'
import { Routes, Route } from 'react-router-dom';
import HomeComponent from './HomeComponent';
import UpdateNoteComponent from './UpdateNoteComponent'
import AppConfig from '../commons/AppConfig.json';
import Login from './Login';
import Signup from './Signup';

export default function RouteComponent(props) {
    return (
        <Routes>
            <Route exact path={`${AppConfig.login}`} element={<Login alert={props.alert} />} />
            <Route exact path={`${AppConfig.signUp}`} element={<Signup alert={props.alert} />} />
            <Route exact path={`${AppConfig.homeRoute}`} element={<HomeComponent alert={props.alert} />} />
            <Route exact path={`${AppConfig.updateNoteRoute}`} element={<UpdateNoteComponent alert={props.alert} />} />
        </Routes>
    )
}
