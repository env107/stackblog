import React,{Component} from "react";
import "./list.less";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
class List extends Component{

    /*
     属性
    data：数据对象数组
        -结构 [{},{},{}...]
        -对象属性:
            id:文章ID
            publishtime:文章发布时间
            title:文章发布标题
            view:文章阅读数
            goods:点赞数
    OnItemClick：item点击触发事件
        -结构 [CallBack()]
        -回调参数 index(索引)
    
    
    */
    render(){
        const {data,OnItemClick} =  this.props;

        const items = data.map((item,index)=>{
            return (
                <Link to={"/Container/"+item.id} key={index} className="item-link">
                <div className="list-item" onClick={()=>{OnItemClick(index);}} >
                    <div className="list-title">{item.title}</div>
                    <div className="list-time">{item.publishtime}</div>
                </div>
                </Link>
            )
        });

        return (
            <div className="list-container">
                {items}
            </div>
        )
    }

}

List.propTypes = {
    data:PropTypes.array.isRequired,
    OnItemClick:PropTypes.func.isRequired
}

export default List;