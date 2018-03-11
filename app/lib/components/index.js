import React,{Component} from "react";
import "./index.less";
import List from "./list";
import {DATA_FROM_HOST} from "../../common";

class Index extends Component{

    constructor(props){
        super(props);
        this.state = {
            data:[]
        };
    }

    componentDidMount(){
        /*在此处请求数据 */
        let data = [];
        let that = this;
        $.ajax({
            url:DATA_FROM_HOST+"/data.php/getArticleList",
            type:"POST",
            data:{},
            async:true,
            success:(info)=>{
                 info = $.parseJSON(info);
                 if(info.data == undefined){
                     alert("获取数据失败！");
                     return false;
                 }
                 console.log(info);
                 that.setState(Object.assign({},that.state,{data:info.data}))
            }
        });
      
        
    }

    OnItemClick(index){}


    render(){

        const {data} = this.state;

        return (
            <div>
               <List data={data} OnItemClick={this.OnItemClick}  />
            </div>
        );
    }

    

}

export default Index;