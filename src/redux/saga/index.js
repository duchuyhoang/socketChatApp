import {all,takeLatest} from "redux-saga/effects";
import {AuthSaga} from "./authSaga"
import {AuthTypes} from "../reducer/auth";


export default function* rootSaga(){
    yield all([
        takeLatest(AuthTypes.LOGIN_REQUEST,AuthSaga.login)
    ])
}