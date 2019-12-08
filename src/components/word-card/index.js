import {WordCardComponent} from "./word-card";
import {fetchWord} from "../../actions";
import {connect} from "react-redux";

const loadData = (store) => store.dispatch(fetchWord('noun'));

const mapStateToProps = ({words}) => ({words});

const component = connect(mapStateToProps, {fetchWord})(WordCardComponent);

export const WordCard = {component, loadData};