import React,{Component} from "react";
import "./readerlist.less";
import PropTypes from "prop-types";



class ReaderList extends Component{

    render(){

        const {data} = this.props;

        let length = data.length;

        let array = data.slice(0,6);

        const users = array.map((item,index)=>{

            return (
                <div className="user-item" key={index}>
                    <img src={item.headimg} className="user-img" />
                </div>
            );
            
        });

        if(length < 1){
            return null;
        }

        return (
            <div className="reader-list">
                读过 {users} {length>6?"...":""}
            </div>
        );

    }
}

export default ReaderList;

ReaderList.propTypes = {
    data:PropTypes.array.isRequired
};