import {WordCardComponent} from "./word-card";
import {fetchWord} from "../../actions";
import {connect} from "react-redux";

const mapStateToProps = ({words}) => ({words});

export const WordCard = connect(mapStateToProps, {fetchWord})(WordCardComponent);